import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType } from 'angular-cesium';
import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { Entity } from './entity';
import { MapItem } from './mapItem';
import { add, remove } from './store/actions/outbreak-list.actions';
import { selectList } from './store/outbreak-list.selector';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private store: Store) {}

  private initMarkers(): Observable<MapItem[]> {
    return this.store.select(selectList);
  }

  public addMarker = (id, name, position, flyPosition) => {
    const entityToAdd: Entity = {
      name,
      position,
      flyPosition,
    };

    const mapItemToAdd: MapItem = {
      id,
      entity: entityToAdd,
      actionType: ActionType.DELETE,
    };

    this.store.dispatch(add({ item: mapItemToAdd }));
  };

  public deleteMarker = (id: string) => {
    this.store.dispatch(remove({ id: id }));
  };

  public getUpdatedMap = () => {
    return this.initMarkers().pipe(
      map((list) =>
        list.map((item) => ({
          id: item.id,
          actionType: item.actionType
            ? ActionType.DELETE
            : ActionType.ADD_UPDATE,
          entity: item.entity,
        }))
      ),
      mergeAll()
    );
  };
}
