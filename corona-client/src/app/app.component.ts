import { Component } from '@angular/core';
import { faShieldVirus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { EmitEvent, EventBusService, Events } from './event-bus.service';
import { changeAddMode, set } from './store/actions/outbreak-list.actions';
import { selectList } from './store/outbreak-list.selector';
import api from '../api';
import { MarkersService } from './markers.service';
import { parse } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  virusIcon = faShieldVirus;
  plusIcon = faPlus;
  newPlaces: string;
  editDetails: boolean = false;

  constructor(
    private store: Store,
    private eventbus: EventBusService,
    private markersService: MarkersService
  ) {
    api.markers.GetAll().then((res) => {
      const parsedMarkers = res.data.map((marker) => {
        marker.position = this.markersService.parsePosition(marker.position);
        marker.flyPosition = this.markersService.parsePosition(
          marker.flyPosition
        );

        return marker;
      });

      this.store.dispatch(
        set({ list: parsedMarkers, savedList: parsedMarkers })
      );

      this.store
        .select(selectList)
        .subscribe(
          (subscriber) =>
            (this.newPlaces = subscriber['savedList'].map((city) => city.name))
        );
    });
  }

  ngOnInit() {}

  toggleAddMode = () => {
    let addMode;

    this.store
      .select((state) => state)
      .subscribe((subscriber) => (addMode = subscriber['list'].addMode));

    this.store.dispatch(changeAddMode({ addMode: !addMode }));

    this.eventbus.emit(new EmitEvent(Events.ToggleAddMode));
  };

  turnOffAddMode = () => {
    this.editDetails = false;
    this.store.dispatch(changeAddMode({ addMode: this.editDetails }));
  };

  turnOnEditMode = () => {
    this.editDetails = true;
  };

  showDetails = () => {
    let currentItem;

    this.store
      .select((state) => state['list'].currentItem)
      .subscribe((sub) => (currentItem = sub));

    return currentItem;
  };
}
