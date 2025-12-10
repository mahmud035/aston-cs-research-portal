import { Types } from 'mongoose';

export type TPublicationKind = 'article' | 'conference';

export interface TPublicationSource {
  sheetRowIndex?: number;
  excelColumn?: 'Article' | 'Conference Paper';
}

export interface TPublication {
  title: string;
  kind: TPublicationKind;
  authors: Types.ObjectId[];
  year?: number | null;
  venue?: string | null;
  doi?: string | null;
  url?: string | null;
  keywords: string[]; // 👈 derived from title
  source?: TPublicationSource;
}
