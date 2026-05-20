import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginComponent } from './features/auth/login.component';
import { TrainerDashboardComponent } from './features/trainer/dashboard/trainer-dashboard.component';
import { BulkUploadComponent } from './features/trainer/upload/bulk-upload.component';
import { PodManagerComponent } from './features/trainer/pods/pod-manager.component';
import { StudentDirectoryComponent } from './features/trainer/directory/student-directory.component';
import { ActivityLogComponent } from './features/trainer/activity/activity-log.component';
import { TraineeDashboardComponent } from './features/trainee/dashboard/trainee-dashboard.component';
import { ScorecardsComponent } from './features/trainee/scorecards/scorecards.component';
import { FeedbackThreadComponent } from './features/trainee/feedback/feedback-thread.component';
import { SkillAlertsComponent } from './features/trainee/alerts/skill-alerts.component';
import { CohortInfoComponent } from './features/trainee/cohort/cohort-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      // Trainer
      { path: 'trainer/dashboard',  component: TrainerDashboardComponent,  canActivate: [AuthGuard], data: { roles: ['TRAINER'] } },
      { path: 'trainer/upload',     component: BulkUploadComponent,         canActivate: [AuthGuard], data: { roles: ['TRAINER'] } },
      { path: 'trainer/pods',       component: PodManagerComponent,         canActivate: [AuthGuard], data: { roles: ['TRAINER'] } },
      { path: 'trainer/directory',  component: StudentDirectoryComponent,   canActivate: [AuthGuard], data: { roles: ['TRAINER'] } },
      { path: 'trainer/activity',   component: ActivityLogComponent,        canActivate: [AuthGuard], data: { roles: ['TRAINER'] } },
      // Trainee
      { path: 'trainee/dashboard',  component: TraineeDashboardComponent,   canActivate: [AuthGuard], data: { roles: ['TRAINEE'] } },
      { path: 'trainee/scorecards', component: ScorecardsComponent,         canActivate: [AuthGuard], data: { roles: ['TRAINEE'] } },
      { path: 'trainee/feedback',   component: FeedbackThreadComponent,     canActivate: [AuthGuard], data: { roles: ['TRAINEE'] } },
      { path: 'trainee/alerts',     component: SkillAlertsComponent,        canActivate: [AuthGuard], data: { roles: ['TRAINEE'] } },
      { path: 'trainee/cohort',     component: CohortInfoComponent,         canActivate: [AuthGuard], data: { roles: ['TRAINEE'] } },
      { path: '', redirectTo: 'trainer/dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
