import { Action, createReducer, on } from '@ngrx/store';
import * as OutbreakListActions from './outbreak-list.actions';
import { IMapItem } from '../../map-item';
import { ActionType } from 'angular-cesium';

export interface State {
  mapItemsList: IMapItem[];
  addMode: boolean;
  currentItem: IMapItem | undefined;
}

const initialState: State = {
  mapItemsList: [],
  addMode: false,
  currentItem: undefined,
};

export const outbreakListReducer = createReducer(
  initialState,
  on(OutbreakListActions.set, (state, { mapItemsList }) => ({
    ...state,
    mapItemsList,
  })),
  on(OutbreakListActions.add, (state, { item }) => ({
    ...state,
    mapItemsList: addItem(state.mapItemsList, item),
  })),
  on(OutbreakListActions.remove, (state, { id }) => ({
    ...state,
    mapItemsList: removeItem(state.mapItemsList, id),
  })),
  on(OutbreakListActions.changeAddMode, (state, { addMode }) => ({
    ...state,
    addMode,
  })),
  on(OutbreakListActions.changeCurrentItem, (state, { currentItem }) => ({
    ...state,
    currentItem,
  })),
  on(OutbreakListActions.save, (state, { item }) => ({
    ...state,
    mapItemsList: saveItem(state.mapItemsList, item),
  }))
);

const addItem = (array: IMapItem[], item: IMapItem): IMapItem[] => {
  const newArray: IMapItem[] = [...array];
  newArray.push(item);

  return newArray;
};

const saveItem = (array: IMapItem[], item: IMapItem): IMapItem[] => {
  let tempArr: IMapItem[] = [...array];
  const index: number = array.findIndex(
    (arrayItem: IMapItem) => arrayItem.id === item.id
  );

  if (index > -1) {
    const tempMapItem: IMapItem = {
      ...item,
      actionType: ActionType.ADD_UPDATE,
    };
    tempArr.splice(index, 1);
    tempArr.push(tempMapItem);
  }

  return tempArr;
};

const removeItem = (array: IMapItem[], id: string): IMapItem[] => {
  let tempArr: IMapItem[] = [...array];
  const index: number = array.findIndex((item: IMapItem) => item.id === id);

  if (index > -1) {
    const tempMapItem: IMapItem = {
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
