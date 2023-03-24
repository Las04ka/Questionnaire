import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { QuestionI } from '../../../shared/models/question';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { deleteQuestion } from '../../../reducers/questions/questions.actions';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { questions: Observable<QuestionI[]>; id: number },
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private store: Store<AppState>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    this.store.dispatch(deleteQuestion({ id: this.data.id }));
    this.dialogRef.close();
  }
}
