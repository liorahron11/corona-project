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
} from './services/event-bus.service';
import { changeAddMode, set } from './store/outbreak-list.actions';
import {
  selectAddMode,
  selectCurrentItem,
  selectList,
} from './store/outbreak-list.selector';
import api from '../api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { IMapItem } from '../map-item';
import { ActionType } from 'angular-cesium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _virusIcon: IconDefinition = faShieldVirus;
  private _plusIcon: IconDefinition = faPlus;
  private _editDetails: boolean = false;
  private _addMode: boolean;

  constructor(
    private store: Store,
    private eventbus: EventBusService,
    private snackbar: MatSnackBar
  ) {
    api.MapItems.GetAll()
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

  public showDetails(): IMapItem {
    let currentItem: IMapItem;

    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (currentItem = sub));

    return currentItem;
  }

  public update(): void {
    let list: IMapItem[] = [];

    this.store
      .select(selectList)
      .subscribe(
        (subscriber) =>
          (list = subscriber.filter(
            (mapItem: IMapItem) => mapItem.actionType === ActionType.ADD_UPDATE
          ))
      );

    api.MapItems.GraphQLUpdate(list)
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

  get virusIcon(): IconDefinition {
    return this._virusIcon;
  }

  get plusIcon(): IconDefinition {
    return this._plusIcon;
  }

  get editDetails(): boolean {
    return this._editDetails;
  }

  get addMode(): boolean {
    return this._addMode;
  }

  set editDetails(value: boolean) {
    this._editDetails = value;
  }

  set addMode(value: boolean) {
    this._addMode = value;
  }
}
