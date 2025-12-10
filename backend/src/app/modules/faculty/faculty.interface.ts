import { Types } from 'mongoose';

export interface TFaculty {
  name: string;
  position?: string;
  researchInterest?: string;
  rawDepartmentAffiliation: string;
  departmentIds: Types.ObjectId[];
  articleIds: Types.ObjectId[];
  conferencePaperIds: Types.ObjectId[];
}
