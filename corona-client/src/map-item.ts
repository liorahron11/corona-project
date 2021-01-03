import { ActionType } from 'angular-cesium';
import { Entity } from './entity';

export interface MapItem {
  id: string;
  actionType: ActionType;
  entity: Entity;
  saved: boolean;
}
