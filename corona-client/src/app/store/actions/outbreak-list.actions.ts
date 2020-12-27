import { createAction, props } from '@ngrx/store';
import { City } from '../../city';

export const set = createAction(
  '[OutbreakList] Set',
  props<{ list: City[]; savedList: City[] }>()
);

export const add = createAction('[OutbreakList] Add', props<{ item: City }>());

export const save = createAction('[SavedList] save', props<{ item: City }>());

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
  props<{ currentItem: City }>()
);
