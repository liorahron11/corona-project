import { Action, createReducer, on, Store } from '@ngrx/store';
import * as OutbreakListActions from './actions/outbreak-list.actions';
import { City } from '../city';

export interface State {
  list: City[];
  savedList: City[];
  addMode: boolean;
  currentItem: City | undefined;
}

const initialState: State = {
  list: [],
  savedList: [],
  addMode: false,
  currentItem: undefined,
};

export const outbreakListReducer = createReducer(
  initialState,
  on(OutbreakListActions.set, (state, { list }) => ({
    ...state,
    list: list,
    savedList: list,
  })),
  on(OutbreakListActions.add, (state, { item }) => ({
    ...state,
    list: addItem(state.list, item),
  })),
  on(OutbreakListActions.remove, (state, { id }) => ({
    ...state,
    savedList: removeItem(state.savedList, id),
  })),
  on(OutbreakListActions.changeAddMode, (state, { addMode }) => ({
    ...state,
    addMode: addMode,
  })),
  on(OutbreakListActions.save, (state, { item }) => ({
    ...state,
    savedList: addItem(state.savedList, item),
  })),
  on(OutbreakListActions.changeCurrentItem, (state, { currentItem }) => ({
    ...state,
    currentItem: currentItem,
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

  const index = array.findIndex((item) => item['_id'] === id);

  if (index > -1) {
    tempArr.splice(index, 1);
  }
  return tempArr;
};

export function reducer(state: State | undefined, action: Action) {
  return outbreakListReducer(state, action);
}
