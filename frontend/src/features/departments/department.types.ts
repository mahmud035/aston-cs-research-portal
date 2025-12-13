export interface Department {
  _id: string;
  name: string;
  slug: string;
}

export interface FacultyPreview {
  _id: string;
  name: string;
  position?: string;
}

export interface DepartmentWithFaculties extends Department {
  faculties: FacultyPreview[];
}
