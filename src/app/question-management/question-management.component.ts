import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { questionsSelector } from '../reducers/questions/questions.reducer';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css'],
})
export class QuestionManagementComponent {
  questions$ = this.store.select(questionsSelector);
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  onDelete(i: number): void {
    this.dialog.open(DeleteDialogComponent, {
      data: { questions: this.questions$, id: i },
    });
  }
}
