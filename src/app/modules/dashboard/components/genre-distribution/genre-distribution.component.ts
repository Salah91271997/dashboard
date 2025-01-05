import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenreDistribution } from '../../models/dashboard.interface';

@Component({
  selector: 'app-genre-distribution',
  templateUrl: './genre-distribution.component.html',
  styleUrl: './genre-distribution.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreDistributionComponent {
  @Input() genres: GenreDistribution[] | null = [];

  chartData: any;
  chartOptions: any;

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    this.chartData = {
      labels: this.genres?.map((g) => g.genreName),
      datasets: [
        {
          data: this.genres?.map((g) => g.percentage),
          backgroundColor: [
            '#514B8F',
            '#8A5695',
            '#5DC0A0',
            '#D2E6B5',
            '#7158A6',
            '#9B6BA5',
            '#6ED4B0',
            '#E3F0C5',
          ],
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          position: 'right',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }
}
