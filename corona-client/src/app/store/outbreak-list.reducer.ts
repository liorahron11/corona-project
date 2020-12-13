import { Action, createReducer, on, Store } from '@ngrx/store';
import * as OutbreakListActions from './actions/outbreak-list.actions';
import { City } from '../city';
import { CITIES } from '../citys';

export interface State {
  list: City[];
  addMode: boolean;
}

const initialState: State = {
  list: CITIES,
  addMode: false,
};

export const outbreakListReducer = createReducer(
  initialState,
  on(OutbreakListActions.set, ({ list }) => ({
    list: list,
  })),
  on(OutbreakListActions.add, (state, { item }) => ({
    list: addItem(state.list, item),
  })),
  on(OutbreakListActions.remove, (state, { id }) => ({
    list: removeItem(state.list, id),
  })),
  on(OutbreakListActions.changeAddMode, (state, { addMode }) => ({
    ...state,
    addMode: addMode,
  }))
);

const addItem = (array, item) => {
  const newArray = [];

  array.forEach((city) => {
    newArray.push(city);
  });
  newArray.push(item);
  return newArray;
};

const removeItem = (array, id: string) => {
  const arrayOfID = array.map((item) => item.id);
  const index = arrayOfID.indexOf(id);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

export function reducer(state: State | undefined, action: Action) {
  return outbreakListReducer(state, action);
}
