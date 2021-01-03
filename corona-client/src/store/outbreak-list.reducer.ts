import { Action, createReducer, on } from '@ngrx/store';
import * as OutbreakListActions from './actions/outbreak-list.actions';
import { MapItem } from '../map-item';
import { ActionType } from 'angular-cesium';

export interface State {
  list: MapItem[];
  addMode: boolean;
  currentItem: MapItem | undefined;
}

const initialState: State = {
  list: [],
  addMode: false,
  currentItem: undefined,
};

export const outbreakListReducer = createReducer(
  initialState,
  on(OutbreakListActions.set, (state, { list }) => ({
    ...state,
    list: list,
  })),
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
  on(OutbreakListActions.changeCurrentItem, (state, { currentItem }) => ({
    ...state,
    currentItem: currentItem,
  })),
  on(OutbreakListActions.save, (state, { item }) => ({
    ...state,
    list: saveItem(state.list, item),
  }))
);

const addItem = (array, item) => {
  const newArray = [...array];
  newArray.push(item);

  return newArray;
};

const saveItem = (array, item) => {
  let tempArr = [...array];
  const index = array.findIndex((arrayItem) => arrayItem.id === item.id);

  if (index > -1) {
    const tempMapItem: MapItem = {
      ...item,
      actionType: ActionType.ADD_UPDATE,
    };
    tempArr.splice(index, 1);
    tempArr.push(tempMapItem);
  }

  return tempArr;
};

const removeItem = (array, id: string) => {
  let tempArr = [...array];
  const index = array.findIndex((item: MapItem) => item.id === id);

  if (index > -1) {
    const tempMapItem: MapItem = {
      ...tempArr[index],
      actionType: ActionType.DELETE,
      saved: false,
    };
    tempArr.splice(index, 1);
    tempArr.push(tempMapItem);
  }

  return tempArr;
};

export function reducer(state: State | undefined, action: Action) {
  return outbreakListReducer(state, action);
}
