// features/trainer/directory/student-directory.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScoreService } from '../../../core/services/api.services';
import { ScoreResponse } from '../../../shared/models';

@Component({
  selector: 'app-student-directory',
  templateUrl: './student-directory.component.html',
  styles: [`
    .page-wrapper { max-width:1400px; }
    .filter-card { margin-bottom:16px; padding:16px;
      .filter-row { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
      .search-field { flex:1; min-width:200px; }
    }
    .table-card { overflow:hidden; }
    .table-container { overflow-x:auto; }
    .full-table { width:100%; }
    .avatar-circle { width:34px; height:34px; border-radius:50%; display:flex; align-items:center;
      justify-content:center; color:#fff; font-weight:700; font-size:13px; }
    .trend-up   { color:#1A8240; font-size:20px; }
    .trend-down { color:#C22626; font-size:20px; }
    .trend-stable { color:#9BA8BB; font-size:20px; }
    .table-row:hover { background:#F5F8FF; cursor:pointer; }
  `]
})
export class StudentDirectoryComponent implements OnInit {
  displayedColumns = ['avatar','traineeName','traineeEmail','podName','assignmentName','score','trend','feedbackStatus','createdAt'];
  dataSource = new MatTableDataSource<ScoreResponse>([]);
  loading = false;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private scoreSvc: ScoreService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.scoreSvc.getTrainerScores().subscribe({
      next: (d) => {
        this.dataSource.data = d;
        setTimeout(() => { this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  getScoreClass(score: number): string {
    return score >= 75 ? 'score-green' : score >= 65 ? 'score-amber' : 'score-red';
  }

  getTrendIcon(trend: string): string {
    return trend === 'UP' ? 'trending_up' : trend === 'DOWN' ? 'trending_down' : 'trending_flat';
  }

  getTrendClass(trend: string): string {
    return trend === 'UP' ? 'trend-up' : trend === 'DOWN' ? 'trend-down' : 'trend-stable';
  }
}
