import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { questionsSelector } from '../reducers/questions/questions.reducer';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { deleteQuestion } from '../reducers/questions/questions.actions';
import { AutoUnsubscribe } from '../shared/decorators/unsubscriber';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css'],
})
@AutoUnsubscribe
export class QuestionManagementComponent {
  questions$ = this.store.select(questionsSelector);
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  onDelete(created: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((el) => {
      if (el) this.store.dispatch(deleteQuestion({ created: created }));
    });
  }
}
