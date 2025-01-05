import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { catchError, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { MovieFilters, MoviesState } from '../models/movies.interface';
import { MoviesApiService } from './movies-api.service';
import {
  Movie,
  MovieCredit,
  MovieDetails,
} from '../../../shared/models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  private state = new BehaviorSubject<MoviesState>({
    movies: [],
    selectedMovie: null,
    filters: {
      query: null,
      page: 1,
      with_genres: null,
      sort_by: 'popularity.desc',
      primary_release_date_gte: null,
      primary_release_date_lte: null,
    } as MovieFilters, // explicitly cast to MovieFilters
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  });

  readonly movies$ = this.state.pipe(
    map((state) => state.movies),
    distinctUntilChanged()
  );

  readonly selectedMovie$ = this.state.pipe(
    map((state) => state.selectedMovie),
    distinctUntilChanged()
  );

  readonly loading$ = this.state.pipe(
    map((state) => state.loading),
    distinctUntilChanged()
  );

  readonly error$ = this.state.pipe(
    map((state) => state.error),
    distinctUntilChanged()
  );

  readonly totalResults$ = this.state.pipe(
    map((state) => state.totalResults),
    distinctUntilChanged()
  );

  readonly currentPage$ = this.state.pipe(
    map((state) => state.currentPage),
    distinctUntilChanged()
  );

  constructor(private moviesApiService: MoviesApiService) {}

  // movies-facade.service.ts
  searchMovies(filters: Partial<MovieFilters>): void {
    this.updateState({
      loading: true,
      filters: { ...this.state.value.filters, ...filters },
    });

    const currentFilters = this.state.value.filters;

    // Ensure page is always a valid number
    const page = Number(filters.page) || 1;

    let params = new HttpParams().set('page', page.toString());

    if (currentFilters.with_genres) {
      params = params.set('with_genres', currentFilters.with_genres);
    }

    if (currentFilters.sort_by) {
      params = params.set('sort_by', currentFilters.sort_by);
    }

    // Use search only when there's a query
    const request$ = currentFilters.query
      ? this.moviesApiService.searchMovies(
          params.set('query', currentFilters.query)
        )
      : this.moviesApiService.getPopularMovies(params);

    request$
      .pipe(
        catchError((error) => {
          this.updateState({
            error: error.message,
            loading: false,
          });
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.updateState({
          movies: response.results,
          totalResults: response.total_results,
          currentPage: page,
          loading: false,
          error: null,
        });
      });
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.moviesApiService.getMovieDetails(id).pipe(
      catchError((error) => {
        this.updateState({
          error: error.message,
        });
        return EMPTY;
      })
    );
  }

  getMovieCredits(id: number): Observable<MovieCredit> {
    return this.moviesApiService.getMovieCredits(id).pipe(
      catchError((error) => {
        this.updateState({
          error: error.message,
        });
        return EMPTY;
      })
    );
  }

  setSelectedMovie(movie: Movie | null): void {
    this.updateState({ selectedMovie: movie });
  }

  resetState(): void {
    this.state.next({
      movies: [],
      selectedMovie: null,
      filters: {
        query: null,
        page: 1,
        with_genres: null,
        sort_by: 'popularity.desc',
        primary_release_date_gte: null,
        primary_release_date_lte: null,
      },
      loading: false,
      error: null,
      totalResults: 0,
      currentPage: 1,
    });
  }

  private updateState(newState: Partial<MoviesState>): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
  }
}
