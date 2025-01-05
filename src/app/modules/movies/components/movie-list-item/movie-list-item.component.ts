import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movie } from '../../../../shared/models/movie.interface';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListItemComponent implements OnInit {
  @Input() movie!: Movie;

  getMoviePoster(movie: Movie): string {
    return movie.poster_path
      ? `${environment.tmdb.api.imageBaseUrl}/w200${movie.poster_path}`
      : '/assets/images/no-poster.jpg'; // Add a default image
  }
  ngOnInit(): void {
    console.log('MovieListItemComponent initialized', this.movie);
  }
}
