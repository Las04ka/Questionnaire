import { createReducer, createSelector, on } from '@ngrx/store';

// eslint-disable-next-line sort-imports
import {
  addQuestion,
  answerQuestion,
  deleteAnswer,
  deleteQuestion,
} from './questions.actions';
import { AppState } from '../index';
import { QuestionI } from '../../shared/models/question';

export interface QuestionsState {
  questions: QuestionI[];
}
const initialState: QuestionsState = {
  questions: [],
};
export const QuestionsReducer = createReducer(
  initialState,
  on(addQuestion, (state, { question }) => ({
    ...state,
    questions: [question, ...state.questions],
    answer: '',
  })),
  on(deleteQuestion, (state, { id }) => ({
    ...state,
    questions: state.questions.filter((_, index) => index !== id),
  })),
  on(answerQuestion, (state, { id, answer }) => ({
    ...state,
    questions: state.questions.map((question, index) => {
      if (index === id) {
        return {
          ...question,
          answer,
        };
      } else {
        return question;
      }
    }),
  })),
  on(deleteAnswer, (state, { id }) => ({
    ...state,
    questions: state.questions.map((question, index) => {
      if (index === id) {
        return {
          ...question,
          answer: null,
        };
      } else {
        return question;
      }
    }),
  })),
);
const questionsState = (state: AppState) => state.questions;
export const questionsSelector = createSelector(
  questionsState,
  (state) => state.questions,
);
