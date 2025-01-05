import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';
import { MovieDetails } from '../../../shared/models/movie.interface';
import { MoviesFacade } from '../services/movies-facade.service';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<MovieDetails> {
  constructor(private moviesFacade: MoviesFacade, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieDetails> {
    return this.moviesFacade.getMovieDetails(+route.paramMap.get('id')!).pipe(
      catchError(() => {
        this.router.navigate(['/error']);
        return EMPTY;
      })
    );
  }
}
