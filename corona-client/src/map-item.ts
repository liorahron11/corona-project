import { ActionType } from 'angular-cesium';
import { IEntity } from './entity';

export interface IMapItem {
  id: string;
  actionType: ActionType;
  entity: IEntity;
  saved: boolean;
}
