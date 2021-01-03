import { createAction, props } from '@ngrx/store';
import { IMapItem } from '../../map-item';

export const set = createAction(
  '[OutbreakList] Set',
  props<{ list: IMapItem[] }>()
);

export const add = createAction(
  '[OutbreakList] Add',
  props<{ item: IMapItem }>()
);

export const save = createAction(
  '[SavedList] save',
  props<{ item: IMapItem }>()
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
  props<{ currentItem: IMapItem }>()
);
