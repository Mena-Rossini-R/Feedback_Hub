// features/trainer/upload/bulk-upload.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScoreService } from '../../../core/services/api.services';
import { ScoreResponse } from '../../../shared/models';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {
  selectedFile: File | null = null;
  dragOver = false;
  uploading = false;
  uploadedScores: ScoreResponse[] = [];
  displayedColumns = ['traineeName', 'assignmentName', 'category', 'score', 'grade', 'submittedDate'];

  constructor(private scoreSvc: ScoreService, private snack: MatSnackBar) {}

  onDragOver(e: DragEvent): void { e.preventDefault(); this.dragOver = true; }
  onDragLeave(): void { this.dragOver = false; }

  onDrop(e: DragEvent): void {
    e.preventDefault(); this.dragOver = false;
    const file = e.dataTransfer?.files[0];
    if (file) this.setFile(file);
  }

  onFileSelect(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.setFile(file);
  }

  setFile(file: File): void {
    const allowed = ['xlsx', 'xls', 'csv'];
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!allowed.includes(ext)) { this.snack.open('Only .xlsx, .xls, .csv files allowed', 'Close', { duration: 4000 }); return; }
    if (file.size > 10 * 1024 * 1024) { this.snack.open('File too large (max 10 MB)', 'Close', { duration: 4000 }); return; }
    this.selectedFile = file;
    this.uploadedScores = [];
  }

  upload(): void {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.scoreSvc.bulkUpload(this.selectedFile).subscribe({
      next: (scores) => {
        this.uploadedScores = scores;
        this.uploading = false;
        this.snack.open(`${scores.length} scores imported successfully!`, 'Close', { duration: 4000 });
      },
      error: (err) => {
        this.uploading = false;
        this.snack.open(err.error?.error ?? 'Upload failed', 'Close', { duration: 4000 });
      }
    });
  }

  cancel(): void { this.selectedFile = null; this.uploadedScores = []; }

  getScoreClass(score: number): string {
    return score >= 75 ? 'score-green' : score >= 65 ? 'score-amber' : 'score-red';
  }

  formatSize(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
