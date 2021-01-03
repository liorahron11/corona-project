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
  private _currentItem: IMapItem;
  private _mapItemsList: IMapItem[];

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

    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (this.currentItem = sub));

    this.store
      .select(selectList)
      .subscribe(
        (subscriber) =>
          (this.mapItemsList = subscriber.filter(
            (mapItem: IMapItem) => mapItem.actionType === ActionType.ADD_UPDATE
          ))
      );
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

  public update(): void {
    api.MapItems.GraphQLUpdate(this.mapItemsList)
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

  get currentItem(): IMapItem {
    return this._currentItem;
  }

  get mapItemsList(): IMapItem[] {
    return this._mapItemsList;
  }

  set mapItemsList(value: IMapItem[]) {
    this._mapItemsList = value;
  }

  set currentItem(value: IMapItem) {
    this._currentItem = value;
  }

  set editDetails(value: boolean) {
    this._editDetails = value;
  }

  set addMode(value: boolean) {
    this._addMode = value;
  }
}
