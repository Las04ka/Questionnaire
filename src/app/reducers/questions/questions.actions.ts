import { createAction, props } from '@ngrx/store';
import { QuestionI } from '../../shared/models/question';

export const addQuestion = createAction(
  '[Question] Add Question',
  props<{ question: QuestionI }>(),
);
export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ id: number }>(),
);
export const answerQuestion = createAction(
  '[Question] Answer Question',
  props<{ id: number; answer: string }>(),
);
export const deleteAnswer = createAction(
  '[Question] Delete Answer',
  props<{ id: number }>(),
);
