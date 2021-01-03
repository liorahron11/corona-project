import { createSelector } from '@ngrx/store';
import { State } from './outbreak-list.reducer';

export const selectState = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state
);

export const selectList = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.list
);

export const selectCurrentItem = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.currentItem
);

export const selectAddMode = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.addMode
);
