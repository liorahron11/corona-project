import { Action, createReducer, on, Store } from '@ngrx/store';
import * as OutbreakListActions from './actions/outbreak-list.actions';
import { City } from '../city';
import { CITIES } from '../citys';

export interface State {
  list: City[];
  savedList: City[];
  addMode: boolean;
}

const initialState: State = {
  list: CITIES,
  savedList: CITIES,
  addMode: false,
};

export const outbreakListReducer = createReducer(
  initialState,
  on(OutbreakListActions.set, (state, { list }) => ({ ...state, list: list })),
  on(OutbreakListActions.add, (state, { item }) => ({
    ...state,
    list: addItem(state.list, item),
  })),
  on(OutbreakListActions.remove, (state, { id }) => ({
    ...state,
    list: removeItem(state.list, id),
  })),
  on(OutbreakListActions.changeAddMode, (state, { addMode }) => ({
    ...state,
    addMode: addMode,
  })),
  on(OutbreakListActions.save, (state, { item }) => ({
    ...state,
    savedList: addItem(state.savedList, item),
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
  let tempArr = [...array];
  const index = array.findIndex((item) => item.id === id);

  if (index > -1) {
    tempArr.splice(index, 1);
  }
  return tempArr;
};

export function reducer(state: State | undefined, action: Action) {
  return outbreakListReducer(state, action);
}
