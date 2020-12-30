import { createSelector } from '@ngrx/store';
import { MapItem } from '../mapItem';
import { State } from './outbreak-list.reducer';

export const selectList = createSelector(
  (state: State) => state.list,
  (list: MapItem[]) => list
);
