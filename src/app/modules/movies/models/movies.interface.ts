import { Movie } from '../../../shared/models/movie.interface';

export interface MovieFilters {
  query: string | null;
  page: number;
  with_genres: string | null;
  sort_by: MovieSortOption;
  primary_release_date_gte: string | null;
  primary_release_date_lte: string | null;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  filters: MovieFilters;
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
}

export type MovieSortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc';

export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  filters: MovieFilters;
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
}
