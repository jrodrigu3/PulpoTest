export interface DataResponse {
  Response: string;
  Search?: Array<Search>;
  totalResults?: number;
}

export interface Search {
  imdbID?: string;
  Year: string;
  Type: string;
  Title: string;
  Poster: string;
  favorite: boolean;
}
