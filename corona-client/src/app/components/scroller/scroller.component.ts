import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMapItem } from '../../../map-item';
import { selectList } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
})
export class ScrollerComponent implements OnInit {
  public items: IMapItem[] = [];

  constructor(private store: Store) {
    this.store.select(selectList).subscribe((subscriber) => {
      this.items = subscriber.filter((mapItem: IMapItem) => mapItem.saved);
    });
  }

  ngOnInit(): void {}
}
