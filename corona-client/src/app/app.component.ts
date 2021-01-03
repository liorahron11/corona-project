import { Component } from '@angular/core';
import {
  faShieldVirus,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
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
  public virusIcon: IconDefinition = faShieldVirus;
  public plusIcon: IconDefinition = faPlus;
  public editDetails: boolean = false;
  public addMode: boolean;

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

  public toggleAddMode(): void {
    this.store.dispatch(changeAddMode({ addMode: !this.addMode }));
    this.eventbus.emit(new EmitEvent(Events.ToggleAddMode));
  }

  public turnOffAddMode(): void {
    this.editDetails = false;
    this.store.dispatch(changeAddMode({ addMode: this.editDetails }));
  }

  public turnOnEditMode(): void {
    this.editDetails = true;
  }

  public showDetails(): MapItem {
    let currentItem: MapItem;

    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (currentItem = sub));

    return currentItem;
  }

  public update(): void {
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
