import { createAction, props } from '@ngrx/store';
import { MapItem } from '../../map-item';

export const set = createAction(
  '[OutbreakList] Set',
  props<{ list: MapItem[] }>()
);

export const add = createAction(
  '[OutbreakList] Add',
  props<{ item: MapItem }>()
);

export const save = createAction(
  '[SavedList] save',
  props<{ item: MapItem }>()
);

export const remove = createAction(
  '[OutbreakList] Remove',
  props<{ id: string }>()
);

export const changeAddMode = createAction(
  '[OutbreakList] changeAddMode',
  props<{ addMode: boolean }>()
);

export const changeCurrentItem = createAction(
  '[currentItem] changeCurrentItem',
  props<{ currentItem: MapItem }>()
);
