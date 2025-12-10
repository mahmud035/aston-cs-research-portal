import { Document, Model, Schema, model } from 'mongoose';
import { TPublication } from './publication.interface';

export interface PublicationDocument extends TPublication, Document {}
export type PublicationModelType = Model<PublicationDocument>;

const publicationSchema = new Schema<PublicationDocument>(
  {
    title: { type: String, required: true, trim: true },
    kind: {
      type: String,
      enum: ['article', 'conference'],
      required: true,
    },
    authors: [{ type: Schema.Types.ObjectId, ref: 'Faculty', default: [] }],
    year: { type: Number },
    venue: { type: String },
    doi: { type: String },
    url: { type: String },
    keywords: { type: [String], default: [] },
    source: {
      sheetRowIndex: { type: Number },
      excelColumn: { type: String, enum: ['Article', 'Conference Paper'] },
    },
  },
  {
    timestamps: true,
  }
);

export const Publication = model<PublicationDocument, PublicationModelType>(
  'Publication',
  publicationSchema
);
