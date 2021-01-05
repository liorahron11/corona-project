import { Component, Input, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { EventBusService } from '../../services/event-bus.service';
import { EmitEvent } from '../../../emit-event';
import { Events } from '../../../events';
import { IMapItem } from '../../../map-item';
import { changeCurrentItem } from '../../store/outbreak-list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [],
})
export class ListComponent implements OnInit {
  @Input() public items: IMapItem[] = [];
  private _currentItem: string;

  constructor(private _eventbus: EventBusService, private _store: Store) {}

  ngOnInit(): void {}

  public itemClicked(options: MatListOption[]) {
    this.currentItem = options.map((o) => o.value)[0];

    const mapItemClicked: IMapItem = this.items.find(
      (IMapItem) => IMapItem.id === this.currentItem
    );

    this._eventbus.emit(new EmitEvent(Events.MARKER_SELECT, mapItemClicked));
    this._store.dispatch(changeCurrentItem({ currentItem: mapItemClicked }));
  }

  get currentItem(): string {
    return this._currentItem;
  }

  set currentItem(value: string) {
    this._currentItem = value;
  }
}
