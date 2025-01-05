import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  distinctUntilChanged,
  combineLatest,
  catchError,
  EMPTY,
  Observable,
} from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import {
  DashboardState,
  GenreDistribution,
  MovieStats,
} from '../models/dashboard.interface';
import { Genre, Movie } from '../../../shared/models/movie.interface';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class DashboardFacade {
  private state = new BehaviorSubject<DashboardState>({
    trendingMovies: [],
    movieStats: null,
    loading: false,
    error: null,
  });

  readonly trendingMovies$ = this.state.pipe(
    map((state) => state.trendingMovies),
    distinctUntilChanged()
  );

  readonly movieStats$ = this.state.pipe(
    map((state) => state.movieStats),
    distinctUntilChanged()
  );

  constructor(private apiService: ApiService) {}

  loadDashboardData(): void {
    this.updateState({ loading: true });

    combineLatest([
      this.apiService.getWithPagination<Movie>('/trending/movie/day'),
      this.fetchMovieStats(),
      this.loadGenreDistribution(),
    ])
      .pipe(
        catchError((error) => {
          this.updateState({ error: error.message, loading: false });
          return EMPTY;
        })
      )
      .subscribe(([trendingResponse, stats, genres]) => {
        this.updateState({
          trendingMovies: trendingResponse.results,
          movieStats: stats,
          genreDistribution: genres,
          loading: false,
          error: null,
        });
      });
  }

  private fetchMovieStats(): Observable<MovieStats> {
    // Fetch various stats from TMDB API
    return combineLatest([
      this.apiService.get<any>('/movie/latest'),
      this.apiService.getWithPagination<Movie>('/movie/top_rated'),
    ]).pipe(
      map(([latest, topRated]) => ({
        totalMovies: latest.id, // Approximate total movies by latest id
        averageRating: this.calculateAverageRating(topRated.results),
        topRatedCount: topRated.total_results,
      }))
    );
  }

  private calculateAverageRating(movies: Movie[]): number {
    return (
      movies.reduce((acc, movie) => acc + movie.vote_average, 0) / movies.length
    );
  }

  private updateState(newState: Partial<DashboardState>): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
  }
  private loadGenreDistribution(): Observable<GenreDistribution[]> {
    return combineLatest([
      this.apiService.get<{ genres: Genre[] }>('/genre/movie/list'),
      this.apiService.getWithPagination<Movie>('/discover/movie'),
    ]).pipe(
      map(([genreList, movies]) => {
        const genreCounts = new Map<number, number>();
        const totalMovies = movies.total_results;

        movies.results.forEach((movie) => {
          movie.genre_ids.forEach((genreId) => {
            const current = genreCounts.get(genreId) || 0;
            genreCounts.set(genreId, current + 1);
          });
        });

        return genreList.genres.map((genre) => ({
          genreId: genre.id,
          genreName: genre.name,
          movieCount: genreCounts.get(genre.id) || 0,
          percentage: ((genreCounts.get(genre.id) || 0) / totalMovies) * 100,
        }));
      })
    );
  }
  genreDistribution$ = this.state.pipe(
    map((state) => state.genreDistribution),
    distinctUntilChanged()
  );
}
