// features/trainer/pods/pod-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../../core/services/api.services';
import { ScoreResponse } from '../../../shared/models';

@Component({
  selector: 'app-pod-manager',
  template: `
  <div class="page-wrapper">
    <div class="page-header"><div><h2>Pod Manager</h2><p>Organise students into Pods and monitor group health</p></div></div>
    <app-loading-spinner *ngIf="loading"></app-loading-spinner>
    <div class="pod-grid" *ngIf="!loading">
      <mat-card class="pod-card" *ngFor="let pod of pods">
        <div class="pod-stripe" [style.background]="pod.color"></div>
        <div class="pod-body">
          <div class="pod-header-row">
            <span class="pod-name">{{ pod.name }}</span>
            <span class="pod-status" [style.background]="pod.color">{{ pod.status }}</span>
          </div>
          <div class="pod-avg" [style.color]="pod.color">{{ pod.avg | number:'1.0-0' }}%</div>
          <div class="pod-sub">{{ pod.count }} students · Avg Score</div>
          <mat-progress-bar mode="determinate" [value]="pod.avg"
            [color]="pod.avg >= 75 ? 'primary' : 'warn'" style="margin:8px 0 4px"></mat-progress-bar>
        </div>
      </mat-card>
    </div>
  </div>`,
  styles: [`
    .page-wrapper { max-width:1200px; }
    .pod-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; }
    .pod-card { display:flex; padding:0 !important; overflow:hidden; }
    .pod-stripe { width:6px; flex-shrink:0; }
    .pod-body { padding:16px; flex:1;
      .pod-header-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;
        .pod-name { font-size:16px; font-weight:700; color:#0E1630; }
        .pod-status { padding:2px 10px; border-radius:10px; font-size:11px; font-weight:600; color:#fff; }
      }
      .pod-avg { font-size:28px; font-weight:700; }
      .pod-sub { font-size:12px; color:#9BA8BB; }
    }
  `]
})
export class PodManagerComponent implements OnInit {
  loading = true;
  pods: any[] = [];

  constructor(private scoreSvc: ScoreService) {}

  ngOnInit(): void {
    this.scoreSvc.getTrainerScores().subscribe({
      next: (scores) => {
        const grouped: Record<string, number[]> = {};
        for (const s of scores) {
          if (!grouped[s.podName]) grouped[s.podName] = [];
          grouped[s.podName].push(s.score);
        }
        const colors = ['#2A70B2','#1A8240','#BE780E','#C22626','#12987A','#6838A8'];
        this.pods = Object.entries(grouped).map(([name, sc], i) => {
          const avg = sc.reduce((a,b)=>a+b,0)/sc.length;
          return { name, avg, count: sc.length, color: colors[i%colors.length],
                   status: avg>=75?'Active':avg>=65?'At Risk':'Critical' };
        });
        if (!this.pods.length) {
          this.pods = ['Pod A','Pod B','Pod C','Pod D','Pod E','Pod F'].map((name,i)=>
            ({ name, avg:0, count:0, color:colors[i%colors.length], status:'No Data' }));
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
