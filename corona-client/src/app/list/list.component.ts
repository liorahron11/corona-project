import { Component, Input, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { EventBusService, EmitEvent, Events } from '../event-bus.service';
import { MapItem } from '../mapItem';
import { changeCurrentItem } from '../store/actions/outbreak-list.actions';
import { selectList } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [],
})
export class ListComponent implements OnInit {
  @Input() items: string[] = [];
  currentItem: string;

  constructor(private eventbus: EventBusService, private store: Store) {}

  ngOnInit(): void {}

  itemClicked = (options: MatListOption[]) => {
    this.currentItem = options.map((o) => o.value)[0];

    let mapItemsList: MapItem[];

    this.store
      .select(selectList)
      .subscribe((subscriber) => (mapItemsList = subscriber));

    const MapItemClicked = mapItemsList.find(
      (mapItem) => mapItem.entity.name === this.currentItem
    );

    this.eventbus.emit(new EmitEvent(Events.MarkerSelect, MapItemClicked));
    this.store.dispatch(changeCurrentItem({ currentItem: MapItemClicked }));
  };
}
