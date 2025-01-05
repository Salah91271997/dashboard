import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import {
  Movie,
  MovieDetails,
  MovieCredit,
  Genre,
} from '../../../shared/models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private apiService: ApiService) {}

  searchMovies(params: HttpParams) {
    return this.apiService.getWithPagination<Movie>('/search/movie', params);
  }

  getPopularMovies(params: HttpParams) {
    return this.apiService.getWithPagination<Movie>('/movie/popular', params);
  }

  getMovieDetails(id: number) {
    return this.apiService.get<MovieDetails>(`/movie/${id}`);
  }

  getMovieCredits(id: number) {
    return this.apiService.get<MovieCredit>(`/movie/${id}/credits`);
  }

  getGenres() {
    return this.apiService.get<{ genres: Genre[] }>('/genre/movie/list');
  }
}
