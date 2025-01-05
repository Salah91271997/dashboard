// modules/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MovieStatsComponent } from './components/movie-stats/movie-stats.component';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { GenreDistributionComponent } from './components/genre-distribution/genre-distribution.component';
// Components

// Services

// Shared
@NgModule({
  declarations: [
    DashboardComponent,
    MovieCardComponent,
    MovieStatsComponent,
    TrendingMoviesComponent,
    GenreDistributionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule, // PrimeNG
    CarouselModule, // PrimeNG
    CardModule, // PrimeNG
    ButtonModule, // PrimeNG
    RatingModule, // PrimeNG
    ProgressSpinnerModule, // PrimeNG
    TooltipModule, // PrimeNG
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class DashboardModule {}
