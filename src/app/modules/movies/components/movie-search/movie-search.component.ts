import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Genre } from '../../../../shared/models/movie.interface';
import { MoviesFacade } from '../../services/movies-facade.service';
import { MovieFilters, MovieSortOption } from '../../models/movies.interface';
import { MoviesApiService } from '../../services/movies-api.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  private destroy$ = new Subject<void>();
  genres: Genre[] = [];

  searchForm: FormGroup = this.fb.group({
    query: [null],
    with_genres: [null],
    sort_by: ['popularity.desc' as MovieSortOption],
  });

  sortOptions: { label: string; value: MovieSortOption }[] = [
    { label: 'Popularity Descending', value: 'popularity.desc' },
    { label: 'Popularity Ascending', value: 'popularity.asc' },
    { label: 'Rating Descending', value: 'vote_average.desc' },
    { label: 'Rating Ascending', value: 'vote_average.asc' },
    { label: 'Release Date Descending', value: 'release_date.desc' },
    { label: 'Release Date Ascending', value: 'release_date.asc' },
  ];

  constructor(
    private fb: FormBuilder,
    private moviesApiService: MoviesApiService,
    private moviesFacade: MoviesFacade
  ) {}

  ngOnInit(): void {
    this.loadGenres();
    this.setupFormSubscription();
  }

  private loadGenres(): void {
    this.moviesApiService
      .getGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.genres = response.genres;
      });
  }

  private setupFormSubscription(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((formValue) => {
        const filters: Partial<MovieFilters> = {
          query: formValue.query || null,
          page: 1,
          with_genres: formValue.with_genres || null,
          sort_by: formValue.sort_by || 'popularity.desc',
          primary_release_date_gte: null,
          primary_release_date_lte: null,
        };

        this.moviesFacade.searchMovies(filters);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
