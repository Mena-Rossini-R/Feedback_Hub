import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreResponse, ScoreRequest, FeedbackResponse, AlertResponse, DashboardStats } from '../../shared/models';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ScoreService {
  constructor(private http: HttpClient) {}

  createScore(req: ScoreRequest): Observable<ScoreResponse> {
    return this.http.post<ScoreResponse>(`${API}/trainer/scores`, req);
  }

  bulkUpload(file: File): Observable<ScoreResponse[]> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<ScoreResponse[]>(`${API}/trainer/scores/bulk`, form);
  }

  getTrainerScores(): Observable<ScoreResponse[]> {
    return this.http.get<ScoreResponse[]>(`${API}/trainer/scores`);
  }

  getScoresByTrainee(traineeId: number): Observable<ScoreResponse[]> {
    return this.http.get<ScoreResponse[]>(`${API}/scores/trainee/${traineeId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getThread(scoreId: number): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(`${API}/feedback/score/${scoreId}`);
  }

  addMessage(scoreId: number, message: string): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(`${API}/feedback`, { scoreId, message });
  }
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private http: HttpClient) {}

  getAlerts(traineeId: number): Observable<AlertResponse[]> {
    return this.http.get<AlertResponse[]>(`${API}/trainee/alerts/${traineeId}`);
  }

  acknowledge(alertId: number): Observable<AlertResponse> {
    return this.http.patch<AlertResponse>(`${API}/trainee/alerts/${alertId}/acknowledge`, {});
  }

  resolve(alertId: number): Observable<AlertResponse> {
    return this.http.patch<AlertResponse>(`${API}/trainee/alerts/${alertId}/resolve`, {});
  }
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getTrainerDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API}/trainer/dashboard`);
  }

  getTraineeDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API}/trainee/dashboard`);
  }
}
