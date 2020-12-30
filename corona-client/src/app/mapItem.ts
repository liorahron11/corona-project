import { ActionType } from 'angular-cesium';
import { City } from './city';

export interface MapItem {
  id: string;
  actionType: ActionType;
  entity: City;
}
