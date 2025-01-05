import { Component, Input } from '@angular/core';
import { MovieStats } from '../../models/dashboard.interface';

@Component({
  selector: 'app-movie-stats',
  templateUrl: './movie-stats.component.html',
  styleUrl: './movie-stats.component.scss',
})
export class MovieStatsComponent {
  @Input() stats: MovieStats | null = null;
}
