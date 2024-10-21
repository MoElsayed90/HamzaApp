export interface Authors {
  id: number;
  title: string;
  prepared_by: PreparedBy[];
}
export interface AuthorsData {
  id: number;
  title: string;
  recitations: Authors[];
}
export interface PreparedBy {
  id: number;
  source_id: number;
  title: string;
  type: string;
  kind: string;
}
export interface AuthorTitles {
  [key: string]: {
    id: number;
    title: string;
    description: string;
  };
}
export interface SuraTitles {
  id: number;
  title: string;
  description: string;
  url: string;
}
