export interface DataResponse {
  Response: string;
  Search?: Array<Movie>;
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

export interface Movie {
  imdbID?: string;
  Year: string;
  Type: string;
  Title: string;
  Poster: string;
  favorite: boolean;
}