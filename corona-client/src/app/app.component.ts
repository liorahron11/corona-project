import { Component } from '@angular/core';
import { faShieldVirus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  EmitEvent,
  EventBusService,
  Events,
} from './services/event-bus.service/event-bus.service';
import { changeAddMode, set } from './store/outbreak-list.actions';
import {
  selectAddMode,
  selectCurrentItem,
  selectList,
} from './store/outbreak-list.selector';
import api from '../api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MapItem } from '../map-item';
import { ActionType } from 'angular-cesium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  virusIcon = faShieldVirus;
  plusIcon = faPlus;
  editDetails: boolean = false;
  addMode: boolean;

  constructor(
    private store: Store,
    private eventbus: EventBusService,
    private snackbar: MatSnackBar
  ) {
    api.mapItems
      .GetAll()
      .then((res) => {
        this.store.dispatch(set({ list: res.data }));
      })
      .catch((error) => {
        console.log(error);
        this.showSnackbar('הייתה שגיאה בקבלת המידע', 'סגור');
      });
  }

  ngOnInit() {
    this.store
      .select(selectAddMode)
      .subscribe((subscriber) => (this.addMode = subscriber));
  }

  private toggleAddMode(): void {
    this.store.dispatch(changeAddMode({ addMode: !this.addMode }));
    this.eventbus.emit(new EmitEvent(Events.ToggleAddMode));
  }

  private turnOffAddMode(): void {
    this.editDetails = false;
    this.store.dispatch(changeAddMode({ addMode: this.editDetails }));
  }

  private turnOnEditMode(): void {
    this.editDetails = true;
  }

  private showDetails(): MapItem {
    let currentItem: MapItem;

    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (currentItem = sub));

    return currentItem;
  }

  private update(): void {
    let list: MapItem[] = [];

    this.store
      .select(selectList)
      .subscribe(
        (subscriber) =>
          (list = subscriber.filter(
            (mapItem: MapItem) => mapItem.actionType === ActionType.ADD_UPDATE
          ))
      );

    api.mapItems
      .GraphQLUpdate(list)
      .then(() => {
        this.showSnackbar('מידע התעדכן בהצלחה', 'סגור');
      })
      .catch((error) => {
        console.log(error);
        this.showSnackbar('שגיאה', 'סגור');
      });
  }

  private showSnackbar(message, action): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: { message: message, action: action },
    });
  }
}
