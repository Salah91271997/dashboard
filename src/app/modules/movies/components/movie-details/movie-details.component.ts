import { Component } from '@angular/core';
import {
  Cast,
  MovieCredit,
  MovieDetails,
} from '../../../../shared/models/movie.interface';
import { environment } from '../../../../../environments/environment.development';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { MoviesFacade } from '../../services/movies-facade.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movie$ = this.route.data.pipe(map((data) => data['movie']));
  movieCredits$!: Observable<MovieCredit>;

  constructor(
    private route: ActivatedRoute,
    private moviesFacade: MoviesFacade,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.loadMovieCredits();
    this.setPageTitle();
  }

  private loadMovieCredits(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieCredits$ = this.moviesFacade.getMovieCredits(+movieId);
    }
  }

  private setPageTitle(): void {
    this.movie$.pipe(take(1)).subscribe((movie) => {
      this.titleService.setTitle(`${movie.title} - Movie App`);
    });
  }

  getBackdropImage(movie: MovieDetails): string {
    return movie.backdrop_path
      ? `${environment.tmdb.api.imageBaseUrl}/original${movie.backdrop_path}`
      : 'assets/images/no-backdrop.jpg';
  }

  getMoviePoster(movie: MovieDetails): string {
    return movie.poster_path
      ? `${environment.tmdb.api.imageBaseUrl}/w342${movie.poster_path}`
      : 'assets/images/no-poster.jpg';
  }

  getProfileImage(actor: Cast): string {
    return actor.profile_path
      ? `${environment.tmdb.api.imageBaseUrl}/w185${actor.profile_path}`
      : 'assets/images/no-profile.jpg';
  }
}
