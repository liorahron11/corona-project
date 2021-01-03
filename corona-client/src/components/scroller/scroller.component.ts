import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapItem } from '../../map-item';
import { selectList } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
})
export class ScrollerComponent implements OnInit {
  items: MapItem[] = [];

  constructor(private store: Store) {
    this.store.select(selectList).subscribe((subscriber) => {
      this.items = subscriber.filter((mapItem: MapItem) => mapItem.saved);
    });
  }

  ngOnInit(): void {}
}
