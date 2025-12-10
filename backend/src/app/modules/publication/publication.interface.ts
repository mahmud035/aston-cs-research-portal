import { Types } from 'mongoose';

export type TPublicationKind = 'article' | 'conference';

export interface TPublication {
  title: string;
  kind: TPublicationKind;
  authors: Types.ObjectId[]; // references to Faculty
  year?: number | null;
  venue?: string | null;
  doi?: string | null;
  url?: string | null;
  keywords: string[]; // 👈 extracted keywords from title

  // Optional original source metadata (if you kept it)
  source?: {
    sheetRowIndex?: number;
    excelColumn?: 'Article' | 'Conference Paper';
  };
}
