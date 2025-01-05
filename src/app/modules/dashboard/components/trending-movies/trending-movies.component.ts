import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardFacade } from '../../services/dashboard-facede.service';
import { Router } from '@angular/router';
import { Movie } from '../../../../shared/models/movie.interface';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingMoviesComponent {
  trendingMovies$ = this.dashboardFacade.trendingMovies$;

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private dashboardFacade: DashboardFacade,
    private router: Router
  ) {}

  onMovieSelect(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
