import { createSelector } from '@ngrx/store';
import { State } from './outbreak-list.reducer';

export const selectMapItemsList = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.mapItemsList
);

export const selectCurrentItem = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.currentItem
);

export const selectAddMode = createSelector(
  (state: { storeState: State }) => state.storeState,
  (state) => state.addMode
);
