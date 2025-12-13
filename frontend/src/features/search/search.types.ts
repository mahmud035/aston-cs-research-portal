export interface PublicationAuthor {
  _id: string;
  name: string;
  position?: string;
}

export interface PublicationSearchResult {
  _id: string;
  title: string;
  kind: 'article' | 'conference';
  authors: PublicationAuthor[];
}

export interface FacultySearchResult {
  _id: string;
  name: string;
  position?: string;
  researchInterest?: string;
}

export interface SearchResponse {
  publications: PublicationSearchResult[];
  faculties: FacultySearchResult[];
}
