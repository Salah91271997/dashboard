import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Movie } from '../../../../shared/models/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  getMoviePoster(movie: Movie): string {
    return movie.poster_path
      ? `${environment.tmdb.api.imageBaseUrl}/w342${movie.poster_path}`
      : 'assets/images/no-poster.jpg';
  }
}
