export type MovieCardResponse = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
export type MovieApiQuery = {
  search: string;
  page: number;
};
export type MovieCardParams = {
  data: MovieCardResponse;
};
