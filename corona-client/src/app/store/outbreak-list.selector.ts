import { createSelector } from '@ngrx/store';
import { City } from '../city';
import { State } from './outbreak-list.reducer';

export const selectList = createSelector(
  (state: State) => state.list,
  (list: City[]) => list
);
