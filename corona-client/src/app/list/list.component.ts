import { Component, Input, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { EventBusService, EmitEvent, Events } from '../event-bus.service';
import { selectList } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [],
})
export class ListComponent implements OnInit {
  @Input() items = [];
  currentItem: string;

  constructor(private eventbus: EventBusService, private store: Store) {}

  ngOnInit(): void {}

  itemClicked = (options: MatListOption[]) => {
    this.currentItem = options.map((o) => o.value)[0];

    let cityList;

    this.store
      .select(selectList)
      .subscribe((subscriber) => (cityList = subscriber["list"]));

    const cityClicked = cityList.find((city) => city.name === this.currentItem);

    this.eventbus.emit(new EmitEvent(Events.MarkerSelect, cityClicked));
  };
}
