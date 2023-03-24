import { MetaReducer } from '@ngrx/store';
import { HydrationMetaReducer } from './hydration.reducer';
import { QuestionsState } from './questions/questions.reducer';

export interface AppState {
  questions: QuestionsState;
}

export const metaReducers: MetaReducer<AppState>[] = [HydrationMetaReducer];
