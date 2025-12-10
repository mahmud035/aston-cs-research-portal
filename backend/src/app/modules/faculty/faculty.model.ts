import { Document, Model, Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

export interface FacultyDocument extends TFaculty, Document {}
export type FacultyModelType = Model<FacultyDocument>;

const facultySchema = new Schema<FacultyDocument>(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, trim: true },
    researchInterest: { type: String },
    rawDepartmentAffiliation: { type: String, required: true },
    departmentIds: [
      { type: Schema.Types.ObjectId, ref: 'Department', default: [] },
    ],
    articleIds: [
      { type: Schema.Types.ObjectId, ref: 'Publication', default: [] },
    ],
    conferencePaperIds: [
      { type: Schema.Types.ObjectId, ref: 'Publication', default: [] },
    ],
  },
  { timestamps: true }
);

export const Faculty = model<FacultyDocument, FacultyModelType>(
  'Faculty',
  facultySchema
);
