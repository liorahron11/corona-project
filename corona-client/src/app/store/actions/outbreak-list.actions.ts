import { createAction, props } from '@ngrx/store';
import { City } from '../../city';

export const set = createAction(
  '[OutbreakList] Set',
  props<{ list: City[] }>()
);

export const add = createAction('[OutbreakList] Add', props<{ item: City }>());

export const remove = createAction(
  '[OutbreakList] Remove',
  props<{ id: string }>()
);

export const changeAddMode = createAction(
  '[OutbreakList] changeAddMode',
  props<{ addMode: boolean }>()
);
