import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMapItem } from '../../../map-item';
import { selectMapItemsList } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
})
export class ScrollerComponent implements OnInit {
  private _items: IMapItem[] = [];

  constructor(private _store: Store) {
    this._store.select(selectMapItemsList).subscribe((storeMapItemsList) => {
      this.items = storeMapItemsList.filter(
        (mapItem: IMapItem) => mapItem.saved
      );
    });
  }

  ngOnInit(): void {}

  get items(): IMapItem[] {
    return this._items;
  }

  set items(value: IMapItem[]) {
    this._items = value;
  }
}
