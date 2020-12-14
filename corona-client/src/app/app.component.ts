import { Component } from '@angular/core';
import { faShieldVirus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { EmitEvent, EventBusService, Events } from './event-bus.service';
import { changeAddMode } from './store/actions/outbreak-list.actions';
import { selectList } from './store/outbreak-list.selector';

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

  constructor(private store: Store, private eventbus: EventBusService) {}

  ngOnInit() {
    this.store
      .select(selectList)
      .subscribe(
        (subscriber) =>
          (this.newPlaces = subscriber['list'].map((city) => city.name))
      );

    this.store
      .select(selectList)
      .subscribe(
        (subscriber) =>
          (this.newPlaces = subscriber['savedList'].map((city) => city.name))
      );
  }

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
}
