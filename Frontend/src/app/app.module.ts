import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

// Layout
import { MainLayoutComponent } from './layout/main-layout.component';

// Auth
import { LoginComponent } from './features/auth/login.component';

// Trainer
import { TrainerDashboardComponent } from './features/trainer/dashboard/trainer-dashboard.component';
import { BulkUploadComponent } from './features/trainer/upload/bulk-upload.component';
import { PodManagerComponent } from './features/trainer/pods/pod-manager.component';
import { StudentDirectoryComponent } from './features/trainer/directory/student-directory.component';
import { ActivityLogComponent } from './features/trainer/activity/activity-log.component';

// Trainee
import { TraineeDashboardComponent } from './features/trainee/dashboard/trainee-dashboard.component';
import { ScorecardsComponent } from './features/trainee/scorecards/scorecards.component';
import { FeedbackThreadComponent } from './features/trainee/feedback/feedback-thread.component';
import { SkillAlertsComponent } from './features/trainee/alerts/skill-alerts.component';
import { CohortInfoComponent } from './features/trainee/cohort/cohort-info.component';

// Shared
import { ScoreBadgeComponent } from './shared/components/score-badge.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner.component';

const MAT = [
  MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDialogModule, MatSnackBarModule, MatChipsModule, MatBadgeModule,
  MatProgressSpinnerModule, MatMenuModule, MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule, MatTabsModule,
  MatDividerModule, MatProgressBarModule
];

@NgModule({
  declarations: [
    AppComponent, MainLayoutComponent, LoginComponent,
    TrainerDashboardComponent, BulkUploadComponent, PodManagerComponent,
    StudentDirectoryComponent, ActivityLogComponent,
    TraineeDashboardComponent, ScorecardsComponent, FeedbackThreadComponent,
    SkillAlertsComponent, CohortInfoComponent,
    ScoreBadgeComponent, LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule, AppRoutingModule, ...MAT
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
