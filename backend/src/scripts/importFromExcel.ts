// importFromExcel.ts — patched version with safer cell-value handling

import ExcelJS from 'exceljs';
import mongoose, { Types } from 'mongoose';
import path from 'path';

import {
  Department,
  DepartmentDocument,
} from '../app/modules/department/department.model';
import { Faculty } from '../app/modules/faculty/faculty.model';
import {
  Publication,
  PublicationDocument,
} from '../app/modules/publication/publication.model';
import config from '../config';
import { extractKeywordsFromTitle } from '../shared/utils/extractKeywordsFromTitle';
import { generateUniqueDepartmentSlug } from '../shared/utils/generateUniqueSlug';
import { isComputerScienceDepartment } from '../shared/utils/isComputerScienceDepartment';

interface RawRow {
  Name: string;
  Position: string;
  ResearchInterest: string;
  DepartmentalAffiliation: string;
  Article: string;
  ConferencePaper: string;
}

function parseDepartments(raw?: string | null): string[] {
  if (!raw) return [];
  return Array.from(
    new Set(
      raw
        .split(/\r?\n/) // split by line breaks
        .flatMap((line) => line.split(',')) // split by commas if multiple per line
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

function parsePublications(raw?: string | null): string[] {
  if (!raw) return [];
  const normalized = raw.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const titles: string[] = [];
  for (const line of lines) {
    const cleaned = line.replace(/^\s*\d+\.\s*/, '').trim();
    if (cleaned) titles.push(cleaned);
  }
  return titles;
}

function detectDepartmentType(
  name: string
): 'school' | 'centre' | 'group' | 'college' | 'other' {
  const lower = name.toLowerCase();
  if (lower.includes('school')) return 'school';
  if (lower.includes('centre') || lower.includes('center')) return 'centre';
  if (lower.includes('group')) return 'group';
  if (lower.includes('college')) return 'college';
  return 'other';
}

async function loadRowsFromExcel(filePath: string): Promise<RawRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error('No worksheet found in Excel file');

  const headerRow = worksheet.getRow(1);
  const headerMap = new Map<string, number>();
  const normalizeHeader = (v: unknown): string =>
    (v ?? '').toString().trim().toLowerCase().replace(/\s+/g, ' ');

  headerRow.eachCell((cell, colNumber) => {
    const key = normalizeHeader(cell.value);
    if (key) headerMap.set(key, colNumber);
  });

  const getCol = (name: string): number => {
    const key = normalizeHeader(name);
    const col = headerMap.get(key);
    if (!col) {
      throw new Error(
        `Column "${name}" not found in Excel header. Available: ${[
          ...headerMap.keys(),
        ].join(', ')}`
      );
    }
    return col;
  };

  const nameCol = getCol('Name');
  const positionCol = getCol('Position');
  const researchInterestCol = getCol('Research Interest');
  const deptAffiliationCol = getCol('Departmental Affiliation');
  const articleCol = getCol('Article');
  const confPaperCol = getCol('Conference Paper');

  const rows: RawRow[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const getCellString = (col: number): string => {
      const cell = row.getCell(col);
      const val = cell.value;

      if (val == null) return '';
      if (typeof val === 'string') return val.trim();
      if (
        typeof val === 'number' ||
        typeof val === 'boolean' ||
        val instanceof Date
      ) {
        return val.toString().trim();
      }
      // ExcelJS rich-text / hyperlink / other types — use cell.text if available
      if (typeof (cell as any).text === 'string') {
        return (cell as any).text.trim();
      }
      return '';
    };

    const Name = getCellString(nameCol);
    const Position = getCellString(positionCol);
    const ResearchInterest = getCellString(researchInterestCol);
    const DepartmentalAffiliation = getCellString(deptAffiliationCol);
    const Article = getCellString(articleCol);
    const ConferencePaper = getCellString(confPaperCol);

    // skip rows with no meaningful data
    if (
      !Name &&
      !Position &&
      !ResearchInterest &&
      !DepartmentalAffiliation &&
      !Article &&
      !ConferencePaper
    ) {
      return;
    }

    rows.push({
      Name,
      Position,
      ResearchInterest,
      DepartmentalAffiliation,
      Article,
      ConferencePaper,
    });
  });

  return rows;
}

async function main() {
  try {
    if (!config.mongoUri) {
      throw new Error('DATABASE_URL / mongoUri is not set');
    }
    await mongoose.connect(config.mongoUri);
    console.log(
      `✅ Database Connected: ${mongoose.connection.db?.databaseName}`
    );

    const filePath = path.resolve(process.cwd(), 'project-dataset.xlsx');
    console.log('📂 Reading Excel:', filePath);

    const rows = await loadRowsFromExcel(filePath);
    console.log(`📄 Rows found: ${rows.length}`);

    const departmentCache = new Map<string, DepartmentDocument>();
    const publicationCache = new Map<string, PublicationDocument>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const name = row.Name.trim();
      if (!name) {
        console.warn(`⚠️ Skipping row ${i + 2}: empty Name`);
        continue;
      }

      const position = row.Position.trim() || undefined;
      const researchInterest = row.ResearchInterest.trim() || undefined;
      const rawDept = row.DepartmentalAffiliation.trim();

      /** 1️⃣ Departments **/
      const deptNames = parseDepartments(rawDept);
      const deptIds: Types.ObjectId[] = [];

      for (const dn of deptNames) {
        if (!isComputerScienceDepartment(dn)) continue;

        let dept = departmentCache.get(dn);
        if (!dept) {
          dept = (await Department.findOne({ name: dn })) ?? undefined;
          if (!dept) {
            const slug = await generateUniqueDepartmentSlug(dn);
            dept = await Department.create({
              name: dn,
              slug,
              type: detectDepartmentType(dn),
              isComputerScienceRelated: true,
            });
            console.log(`➕ Created CS department: ${dn}`);
          }
          departmentCache.set(dn, dept);
        }
        deptIds.push(dept._id);
      }

      /** 2️⃣ Faculty **/
      let faculty = await Faculty.findOne({ name, position });
      if (!faculty) {
        faculty = await Faculty.create({
          name,
          position,
          researchInterest,
          rawDepartmentAffiliation: rawDept,
          departmentIds: deptIds,
          articleIds: [],
          conferencePaperIds: [],
        });
        console.log(`👤 Created faculty: ${name}`);
      } else {
        const merged = Array.from(
          new Set([
            ...faculty.departmentIds.map((id) => id.toString()),
            ...deptIds.map((id) => id.toString()),
          ])
        ).map((id) => new Types.ObjectId(id));
        faculty.departmentIds = merged;
        await faculty.save();
        console.log(`♻️ Updated faculty departments for: ${name}`);
      }
      const facultyId = faculty._id;

      /** 3️⃣ + 4️⃣ Publications **/
      const processTitles = async (
        raw: string,
        kind: 'article' | 'conference'
      ) => {
        const titles = parsePublications(raw);
        for (const title of titles) {
          const key = `${kind}__${title}`;
          let pub = publicationCache.get(key);
          if (!pub) {
            pub = (await Publication.findOne({ title, kind })) ?? undefined;
          }
          if (!pub) {
            pub = await Publication.create({
              title,
              kind,
              authors: [facultyId],
              keywords: extractKeywordsFromTitle(title),
              source: {
                sheetRowIndex: i,
                excelColumn:
                  kind === 'article' ? 'Article' : 'Conference Paper',
              },
            });
            console.log(
              kind === 'article'
                ? `📄 Created article: ${title}`
                : `🎤 Created conference paper: ${title}`
            );
          } else {
            if (!pub.authors.some((a: Types.ObjectId) => a.equals(facultyId))) {
              pub.authors.push(facultyId);
              await pub.save();
              console.log(
                `👥 Added author ${name} to existing ${kind}: ${title}`
              );
            }
          }
          publicationCache.set(key, pub);

          // add to faculty
          if (kind === 'article') {
            if (!faculty.articleIds.some((id) => id.equals(pub._id))) {
              faculty.articleIds.push(pub._id);
            }
          } else {
            if (!faculty.conferencePaperIds.some((id) => id.equals(pub._id))) {
              faculty.conferencePaperIds.push(pub._id);
            }
          }
        }
      };

      await processTitles(row.Article, 'article');
      await processTitles(row.ConferencePaper, 'conference');

      await faculty.save();
    }

    console.log('✅ Import completed');
  } catch (err) {
    console.error('❌ Import failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
