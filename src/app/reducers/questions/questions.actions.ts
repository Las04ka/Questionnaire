import { createAction, props } from '@ngrx/store';

import { IQuestion } from '../../shared/models/question';

export const addQuestion = createAction(
  '[Question] Add Question',
  props<{ question: IQuestion }>(),
);
export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ created: number }>(),
);
export const answerQuestion = createAction(
  '[Question] Answer Question',
  props<{ created: number; answer: string }>(),
);
export const deleteAnswer = createAction(
  '[Question] Delete Answer',
  props<{ created: number }>(),
);
