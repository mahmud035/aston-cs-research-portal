export interface DepartmentRef {
  _id: string;
  name: string;
  slug: string;
}

export interface PublicationPreview {
  _id: string;
  title: string;
  kind: 'article' | 'conference';
  keywords: string[];
}

export interface Faculty {
  _id: string;
  name: string;
  position?: string;
  researchInterest?: string;
  departments: DepartmentRef[];
  articles: PublicationPreview[];
  conferencePapers: PublicationPreview[];
}
