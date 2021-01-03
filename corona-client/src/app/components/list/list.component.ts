import { Component, Input, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';
import {
  EventBusService,
  EmitEvent,
  Events,
} from '../../services/event-bus.service/event-bus.service';
import { IMapItem } from '../../../map-item';
import { changeCurrentItem } from '../../store/outbreak-list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [],
})
export class ListComponent implements OnInit {
  @Input() items: IMapItem[] = [];
  private currentItem: string;

  constructor(private eventbus: EventBusService, private store: Store) {}

  ngOnInit(): void {}

  public itemClicked(options: MatListOption[]) {
    this.currentItem = options.map((o) => o.value)[0];

    const mapItemClicked: IMapItem = this.items.find(
      (IMapItem) => IMapItem.id === this.currentItem
    );

    this.eventbus.emit(new EmitEvent(Events.MarkerSelect, mapItemClicked));
    this.store.dispatch(changeCurrentItem({ currentItem: mapItemClicked }));
  }
}
