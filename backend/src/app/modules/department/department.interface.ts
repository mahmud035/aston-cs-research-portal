export type TDepartmentType =
  | 'school'
  | 'centre'
  | 'group'
  | 'college'
  | 'other';

export interface TDepartment {
  name: string;
  slug: string;
  type: TDepartmentType;
  description?: string;
  isComputerScienceRelated: boolean;
}
