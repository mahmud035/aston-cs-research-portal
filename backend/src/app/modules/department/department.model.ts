import { Document, Model, Schema, model } from 'mongoose';
import { TDepartment } from './department.interface';

export interface DepartmentDocument extends TDepartment, Document {}
export type DepartmentModelType = Model<DepartmentDocument>;

const departmentSchema = new Schema<DepartmentDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: {
      type: String,
      enum: ['school', 'centre', 'group', 'college', 'other'],
      default: 'other',
    },
    description: { type: String },
    isComputerScienceRelated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Department = model<DepartmentDocument, DepartmentModelType>(
  'Department',
  departmentSchema
);
