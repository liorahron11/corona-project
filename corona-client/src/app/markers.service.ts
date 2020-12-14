import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType } from 'angular-cesium';
import { map, mergeAll } from 'rxjs/operators';
import { City } from './city';
import { add } from './store/actions/outbreak-list.actions';
import { selectList } from './store/outbreak-list.selector';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private store: Store) {}

  private initMarkers() {
    return this.store.select(selectList);
  }

  addMarker = (id, name, position, flyPosition) => {
    const cityToAdd: City = {
      id,
      name,
      position,
      flyPosition,
    };

    this.store.dispatch(add({ item: cityToAdd }));

    return this.updatedMap();
  };

  updatedMap = () => {
    return this.initMarkers().pipe(
      map((entity) =>
        entity["list"].map((item) => ({
          id: item.id,
          actionType: ActionType.ADD_UPDATE,
          entity: item,
        }))
      ),
      mergeAll()
    );
  };
}
