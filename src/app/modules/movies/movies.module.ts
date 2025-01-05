import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// PrimeNG
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { TooltipModule } from 'primeng/tooltip';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieSearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieListItemComponent,
    MovieCardComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // PrimeNG
    DataViewModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    RatingModule,
    CardModule,
    DialogModule,
    TabViewModule,
    GalleriaModule,
    FormsModule,
    TooltipModule,
  ],
})
export class MoviesModule {}
