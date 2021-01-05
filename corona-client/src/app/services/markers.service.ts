import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType, Cartesian3 } from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { IMapItem } from '../../map-item';
import { add, remove } from '../store/outbreak-list.actions';
import { selectMapItemsList } from '../store/outbreak-list.selector';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private _store: Store) {}

  public addMapItem(id: string, name: string, position: Cartesian3): void {
    const mapItemToAdd: IMapItem = {
      id,
      entity: {
        name,
        position,
      },
      actionType: ActionType.ADD_UPDATE,
      saved: false,
    };

    this._store.dispatch(add({ item: mapItemToAdd }));
  }

  public deleteMapItem(id: string): void {
    this._store.dispatch(remove({ id: id }));
  }

  public getUpdatedMap(): Observable<IMapItem> {
    return this._store.select(selectMapItemsList).pipe(mergeAll());
  }
}
