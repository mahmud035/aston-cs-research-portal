import ExcelJS from 'exceljs';
import mongoose, { Types } from 'mongoose';
import path from 'path';

import {
  Department,
  DepartmentDocument,
} from '../app/modules/department/department.model';
import { Faculty, FacultyDocument } from '../app/modules/faculty/faculty.model';
import {
  Publication,
  PublicationDocument,
} from '../app/modules/publication/publication.model';
import config from '../config';
import { extractKeywordsFromTitle } from '../shared/utils/extractKeywordsFromTitle';
import { generateUniqueDepartmentSlug } from '../shared/utils/generateUniqueSlug';
import { isComputerScienceDepartment } from '../shared/utils/isComputerScienceDepartment';

// Shape of a row we’ll extract
interface RawRow {
  Name: string;
  Position: string;
  ResearchInterest: string;
  DepartmentalAffiliation: string;
  Article: string;
  ConferencePaper: string;
}

// Split newline-separated and comma-separated department affiliations
function parseDepartments(raw?: string | null): string[] {
  if (!raw) return [];

  const parts = raw
    .split(/\r?\n/) // split by line
    .flatMap((line) => line.split(',')) // further split by comma
    .map((s) => s.trim())
    .filter(Boolean);

  // dedupe
  return Array.from(new Set(parts));
}

// Parse "1. Title\n2. Title" style cell content
function parsePublications(raw?: string | null): string[] {
  if (!raw) return [];
  const normalized = raw.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  const titles: string[] = [];

  for (const line of lines) {
    const cleaned = line.replace(/^\s*\d+\.\s*/, '').trim(); // remove "1. "
    if (cleaned) titles.push(cleaned);
  }

  return titles;
}

// Infer department type from its name
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

  const worksheet = workbook.worksheets[0]; // first sheet
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  // --- Read header row and build a map: normalizedHeader -> column index ---
  const headerRow = worksheet.getRow(1);
  const headerMap = new Map<string, number>();

  const normalizeHeader = (value: unknown): string =>
    (value ?? '').toString().trim().toLowerCase().replace(/\s+/g, ' '); // collapse multiple spaces

  headerRow.eachCell((cell, colNumber) => {
    const key = normalizeHeader(cell.value);
    if (key) {
      headerMap.set(key, colNumber);
    }
  });

  // For debugging if needed:
  // console.log('Header map:', headerMap);

  const getCol = (name: string): number => {
    const key = normalizeHeader(name);
    const col = headerMap.get(key);
    if (!col) {
      throw new Error(
        `Column "${name}" not found in Excel header. Available headers: ${Array.from(
          headerMap.keys()
        ).join(', ')}`
      );
    }
    return col;
  };

  // We expect these logical headers (case-insensitive)
  const nameCol = getCol('Name');
  const positionCol = getCol('Position');
  const researchInterestCol = getCol('Research Interest');
  const deptAffiliationCol = getCol('Departmental Affiliation');
  const articleCol = getCol('Article');
  const confPaperCol = getCol('Conference Paper');

  const rows: RawRow[] = [];

  // --- Iterate over data rows ---
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const getCellString = (col: number): string =>
      (row.getCell(col).value ?? '').toString().trim();

    const Name = getCellString(nameCol);
    const Position = getCellString(positionCol);
    const ResearchInterest = getCellString(researchInterestCol);
    const DepartmentalAffiliation = getCellString(deptAffiliationCol);
    const Article = getCellString(articleCol);
    const ConferencePaper = getCellString(confPaperCol);

    // ignore totally empty rows
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
      `✅ Database Connected: ${
        mongoose.connection.db?.databaseName || 'Unknown'
      }`
    );

    const filePath = path.resolve(process.cwd(), 'project-dataset.xlsx');
    console.log('📂 Reading Excel:', filePath);

    const rows = await loadRowsFromExcel(filePath);
    console.log(`📄 Rows found: ${rows.length}`);

    const departmentCache = new Map<string, DepartmentDocument>();
    const publicationCache = new Map<string, PublicationDocument>();

    // Optional: clear collections before import (for dev only)
    // await Department.deleteMany({});
    // await Faculty.deleteMany({});
    // await Publication.deleteMany({});
    // console.log('🧹 Cleared Department, Faculty, Publication collections');

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const name = row.Name.trim();

      if (!name) {
        console.log(`⚠️  Row ${i + 2}: skipping because Name is empty`);
        continue;
      }

      const position = row.Position.trim() || undefined;
      const researchInterest = row.ResearchInterest.trim() || undefined;
      const rawDeptAffiliation = row.DepartmentalAffiliation.trim();

      // 1️⃣ Departments
      const deptNames = parseDepartments(rawDeptAffiliation);
      const departmentIds: Types.ObjectId[] = [];

      for (const deptName of deptNames) {
        if (!deptName) continue;

        // 🚫 Skip non-CS departments completely
        if (!isComputerScienceDepartment(deptName)) {
          // console.log(`Skipping non-CS department: ${deptName}`);
          continue;
        }

        let dept = departmentCache.get(deptName);

        if (!dept) {
          // Check DB first
          dept = (await Department.findOne({ name: deptName })) ?? undefined;

          if (!dept) {
            const slug = await generateUniqueDepartmentSlug(deptName);

            dept = await Department.create({
              name: deptName,
              slug,
              type: detectDepartmentType(deptName),
              isComputerScienceRelated: true,
            });
            console.log(`➕ Created CS department: ${deptName}`);
          }

          departmentCache.set(deptName, dept);
        }

        departmentIds.push(dept._id);
      }

      // 2️⃣ Faculty
      let faculty: FacultyDocument | null = await Faculty.findOne({
        name,
        position,
      });

      if (!faculty) {
        faculty = await Faculty.create({
          name,
          position,
          researchInterest,
          rawDepartmentAffiliation: rawDeptAffiliation,
          departmentIds,
          articleIds: [],
          conferencePaperIds: [],
        });

        console.log(`👤 Created faculty: ${name}`);
      } else {
        const uniqueDeptIds = Array.from(
          new Set([
            ...faculty.departmentIds.map((id) => id.toString()),
            ...departmentIds.map((id) => id.toString()),
          ])
        ).map((id) => new Types.ObjectId(id));

        faculty.departmentIds = uniqueDeptIds;
        await faculty.save();
        console.log(`♻️ Updated faculty departments for: ${name}`);
      }

      const facultyId = faculty._id;

      // 3️⃣ Articles
      const articleTitles = parsePublications(row.Article);
      const articleIds: Types.ObjectId[] = [];

      for (const title of articleTitles) {
        const key = `article__${title}`;

        let pub = publicationCache.get(key);

        if (!pub) {
          pub =
            (await Publication.findOne({ title, kind: 'article' })) ??
            undefined;

          if (!pub) {
            pub = await Publication.create({
              title,
              kind: 'article',
              authors: [facultyId],
              keywords: extractKeywordsFromTitle(title),
              source: {
                sheetRowIndex: i,
                excelColumn: 'Article',
              },
            });
            console.log(`📄 Created article: ${title}`);
          } else {
            if (!pub.authors.some((id) => id.equals(facultyId))) {
              pub.authors.push(facultyId);
              await pub.save();
              console.log(
                `👥 Added author ${name} to existing article: ${title}`
              );
            }
          }

          publicationCache.set(key, pub);
        } else {
          if (!pub.authors.some((id) => id.equals(facultyId))) {
            pub.authors.push(facultyId);
            await pub.save();
            console.log(`👥 Added author ${name} to cached article: ${title}`);
          }
        }

        articleIds.push(pub._id);
      }

      // 4️⃣ Conference Papers
      const conferenceTitles = parsePublications(row.ConferencePaper);
      const conferenceIds: Types.ObjectId[] = [];

      for (const title of conferenceTitles) {
        const key = `conference__${title}`;

        let pub = publicationCache.get(key);

        if (!pub) {
          pub =
            (await Publication.findOne({ title, kind: 'conference' })) ??
            undefined;

          if (!pub) {
            pub = await Publication.create({
              title,
              kind: 'conference',
              authors: [facultyId],
              keywords: extractKeywordsFromTitle(title),
              source: {
                sheetRowIndex: i,
                excelColumn: 'Conference Paper',
              },
            });
            console.log(`🎤 Created conference paper: ${title}`);
          } else {
            if (!pub.authors.some((id) => id.equals(facultyId))) {
              pub.authors.push(facultyId);
              await pub.save();
              console.log(
                `👥 Added author ${name} to existing conference paper: ${title}`
              );
            }
          }

          publicationCache.set(key, pub);
        } else {
          if (!pub.authors.some((id) => id.equals(facultyId))) {
            pub.authors.push(facultyId);
            await pub.save();
            console.log(
              `👥 Added author ${name} to cached conference paper: ${title}`
            );
          }
        }

        conferenceIds.push(pub._id);
      }

      // 5️⃣ Attach articles + conference papers to faculty
      if (articleIds.length || conferenceIds.length) {
        const uniqueArticleIds = Array.from(
          new Set(
            [...faculty.articleIds, ...articleIds].map((id) => id.toString())
          )
        ).map((id) => new Types.ObjectId(id));

        const uniqueConferenceIds = Array.from(
          new Set(
            [...faculty.conferencePaperIds, ...conferenceIds].map((id) =>
              id.toString()
            )
          )
        ).map((id) => new Types.ObjectId(id));

        faculty.articleIds = uniqueArticleIds;
        faculty.conferencePaperIds = uniqueConferenceIds;
        await faculty.save();
      }
    }

    console.log('✅ Import completed');
  } catch (err) {
    console.error('❌ Import failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main();
