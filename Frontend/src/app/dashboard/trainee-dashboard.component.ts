// features/trainee/dashboard/trainee-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { DashboardService, AlertService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardStats } from '../../../shared/models';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.scss']
})
export class TraineeDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  alertCount = 0;
  loading = true;
  weeklyEntries: { week: string; score: number }[] = [];

  constructor(
    private dashSvc: DashboardService,
    private alertSvc: AlertService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.userId;

    this.dashSvc.getTraineeDashboard().subscribe({
      next: (d) => {
        this.stats = d;
        this.weeklyEntries = Object.entries(d.weeklyTrend ?? {})
          .map(([week, score]) => ({ week, score }))
          .sort((a, b) => a.week.localeCompare(b.week));
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    if (userId) {
      this.alertSvc.getAlerts(userId).subscribe({
        next: (alerts) => this.alertCount = alerts.filter(a => !a.acknowledged).length,
        error: () => {}
      });
    }
  }

  get progressPercent(): number {
    return Math.min(this.stats?.overallProgress ?? 0, 100);
  }

  // Used by [attr.stroke-dasharray] in SVG — avoids NG8002 error
  getDashArray(): string {
    const circumference = 2 * Math.PI * 52; // r=52
    const filled = (this.progressPercent / 100) * circumference;
    return `${filled} ${circumference}`;
  }

  getBarHeight(score: number): number { return (score / 100) * 120; }

  getBarColor(score: number): string {
    return score >= 75 ? '#1A8240' : score >= 65 ? '#BE780E' : '#C22626';
  }
}
