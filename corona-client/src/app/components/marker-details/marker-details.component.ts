import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cartesian3 } from 'angular-cesium';
import { IMapItem } from '../../../map-item';
import { MarkersService } from '../../services/markers.service';
import { changeCurrentItem } from '../../store/outbreak-list.actions';
import { selectCurrentItem } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.css'],
})
export class MarkerDetailsComponent implements OnInit {
  private _currentItem: IMapItem;

  constructor(private _store: Store, private _markersService: MarkersService) {}

  ngOnInit(): void {
    this._store
      .select(selectCurrentItem)
      .subscribe((storeCurrentItem) => (this.currentItem = storeCurrentItem));
  }

  public remove(): void {
    this._markersService.deleteMapItem(this.currentItem.id);
    this._store.dispatch(changeCurrentItem({ currentItem: undefined }));
  }

  public parsedPosition(): string {
    const { x, y, z } = this.currentItem.entity.position;

    return new Cesium.Cartesian3(x, y, z).toString();
  }

  get currentItem(): IMapItem {
    return this._currentItem;
  }

  set currentItem(value: IMapItem) {
    this._currentItem = value;
  }
}
