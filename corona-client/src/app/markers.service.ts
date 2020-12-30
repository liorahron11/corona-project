import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType } from 'angular-cesium';
import { map, mergeAll } from 'rxjs/operators';
import { City } from './city';
import { MapItem } from './mapItem';
import { add, remove } from './store/actions/outbreak-list.actions';
import { selectList } from './store/outbreak-list.selector';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private store: Store) {}

  private initMarkers() {
    return this.store.select(selectList);
  }

  addMarker = (_id, name, position, flyPosition) => {
    const cityToAdd: City = {
      _id,
      name,
      position,
      flyPosition,
    };

    const mapItemToAdd: MapItem = {
      id: _id,
      entity: cityToAdd,
      actionType: ActionType.DELETE,
    };

    this.store.dispatch(add({ item: mapItemToAdd }));

    return this.getUpdatedMap();
  };

  deleteMarker = (id: string) => {
    this.store.dispatch(remove({ id: id }));
  };

  getUpdatedMap = () => {
    return this.initMarkers().pipe(
      map((store) =>
        store['list'].map((item) => ({
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
