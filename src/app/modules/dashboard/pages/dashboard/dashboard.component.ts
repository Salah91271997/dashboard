import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardFacade } from '../../services/dashboard-facede.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  movieStats$ = this.dashboardFacade.movieStats$;
  genreDistribution$ = this.dashboardFacade.genreDistribution$;
  constructor(private dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
