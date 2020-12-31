import { createSelector } from '@ngrx/store';
import { State } from './outbreak-list.reducer';

export const selectState = createSelector(
  (state: State) => state.list,
  (state) => state
);

export const selectList = createSelector(
  (state: State) => state.list,
  (state) => state['list']
);

export const selectCurrentItem = createSelector(
  (state: State) => state.list,
  (state) => state['currentItem']
);

export const selectAddMode = createSelector(
  (state: State) => state.list,
  (state) => state['addMode']
);
