import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.interface';
import { Router } from '@angular/router';
import { MoviesFacade } from '../../services/movies-facade.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() loading = false;
  @Input() totalResults = 0;

  constructor(private router: Router, private moviesFacade: MoviesFacade) {}

  onMovieSelect(movie: Movie): void {
    console.log('Movie selected', movie);

    this.router.navigate(['/movies', movie.id]);
  }

  onPageChange(event: any): void {
    // DataView's pagination starts from 0
    const page = event.first / event.rows + 1;
    this.moviesFacade.searchMovies({ page });
  }
}
