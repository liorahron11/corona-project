import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType } from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { Entity } from '../../entity';
import { MapItem } from '../../map-item';
import { add, remove } from '../../store/actions/outbreak-list.actions';
import { selectList } from '../../store/outbreak-list.selector';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private store: Store) {}

  public addMapItem = (id, name, position) => {
    const mapItemToAdd: MapItem = {
      id,
      entity: {
        name,
        position,
      },
      actionType: ActionType.ADD_UPDATE,
      saved: false,
    };

    this.store.dispatch(add({ item: mapItemToAdd }));
  };

  public deleteMapItem = (id: string) => {
    this.store.dispatch(remove({ id: id }));
  };

  public getUpdatedMap = () => {
    return this.store.select(selectList).pipe(mergeAll());
  };
}
