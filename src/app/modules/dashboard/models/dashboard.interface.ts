import { Movie } from '../../../shared/models/movie.interface';

export interface MovieStats {
  totalMovies: number;
  averageRating: number;
  topRatedCount: number;
}

export interface DashboardState {
  trendingMovies: Movie[];
  movieStats: MovieStats | null;
  loading: boolean;
  error: string | null;
  genreDistribution?: GenreDistribution[];
}
export interface GenreDistribution {
  genreId: number;
  genreName: string;
  movieCount: number;
  percentage: number;
}
