import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionType } from 'angular-cesium';
import { MapItem } from '../mapItem';
import { selectList } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
})
export class ScrollerComponent implements OnInit {
  items: string[] = [];
  constructor(private store: Store) {
    let mapItemsList: MapItem[];

    this.store.select(selectList).subscribe((subscriber) => {
      mapItemsList = subscriber['list'];
      this.items = mapItemsList
        .filter((mapItem) => mapItem.actionType === ActionType.ADD_UPDATE)
        .map((mapItem) => {
          return mapItem.entity.name;
        });
    });
  }

  ngOnInit(): void {}
}
