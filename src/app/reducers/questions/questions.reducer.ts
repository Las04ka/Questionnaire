import { createReducer, createSelector, on } from '@ngrx/store';
import {
  addQuestion,
  answerQuestion,
  deleteAnswer,
  deleteQuestion,
} from './questions.actions';
import { AppState } from '../index';
import { IQuestion } from '../../shared/models/question';

export interface QuestionsState {
  questions: IQuestion[];
}
const initialState: QuestionsState = {
  questions: [],
};
export const QuestionsReducer = createReducer(
  initialState,
  on(addQuestion, (state, { question }) => ({
    ...state,
    questions: [{ ...question, created: Date.now() }, ...state.questions],
    answer: '',
  })),
  on(deleteQuestion, (state, { created }) => ({
    ...state,
    questions: state.questions.filter(
      (question) => question.created !== created,
    ),
  })),
  on(answerQuestion, (state, { created, answer }) => ({
    ...state,
    questions: state.questions.map((question) => {
      if (question.created === created) {
        return {
          ...question,
          answer,
        };
      } else {
        return question;
      }
    }),
  })),
  on(deleteAnswer, (state, { created }) => ({
    ...state,
    questions: state.questions.map((question) => {
      if (question.created == created) {
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
