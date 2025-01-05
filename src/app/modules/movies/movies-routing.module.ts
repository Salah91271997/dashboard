import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieResolver } from './resolvers/movie.resolver';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
    resolve: {
      movie: MovieResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
