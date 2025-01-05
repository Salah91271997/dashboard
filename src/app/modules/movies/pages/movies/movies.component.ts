import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MoviesFacade } from '../../services/movies-facade.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  movies$ = this.moviesFacade.movies$;
  loading$ = this.moviesFacade.loading$;
  totalResults$ = this.moviesFacade.totalResults$;

  constructor(private moviesFacade: MoviesFacade) {}

  ngOnInit(): void {
    this.moviesFacade.searchMovies({});
  }
}
