import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { questionsSelector } from '../reducers/questions/questions.reducer';
import { AppState } from '../reducers';
import { deleteAnswer } from '../reducers/questions/questions.actions';
import { IQuestion } from '../shared/models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent {
  questions$ = this.store.select(questionsSelector);
  constructor(private store: Store<AppState>) {}

  onRevert(created: number): void {
    this.store.dispatch(deleteAnswer({ created: created }));
  }
  trackByFn(index: number, question: IQuestion): number {
    return question.created;
  }
}
