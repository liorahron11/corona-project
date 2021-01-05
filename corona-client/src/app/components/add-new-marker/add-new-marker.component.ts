import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MarkersService } from '../../services/markers.service';
import {
  changeAddMode,
  changeCurrentItem,
  save,
} from '../../store/outbreak-list.actions';
import { selectMapItemsList } from '../../store/outbreak-list.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { IMapItem } from '../../../map-item';
import { ActionType } from 'angular-cesium';

@Component({
  selector: 'app-add-new-marker',
  templateUrl: './add-new-marker.component.html',
  styleUrls: ['./add-new-marker.component.css'],
})
export class AddNewMarkerComponent implements OnInit {
  @Output() public closeAddWindowEvent = new EventEmitter<string>();
  private _name: FormControl = new FormControl('', [Validators.required]);
  private _currentItem: IMapItem;

  constructor(
    private _store: Store,
    private _markersService: MarkersService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._store
      .select(selectMapItemsList)
      .subscribe(
        (subscriber) => (this.currentItem = subscriber[subscriber.length - 1])
      );
  }

  public getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'שם לא הוזן';
    }
  }

  public save(): void {
    if (!this.name.hasError('required')) {
      const currentEntity = this.currentItem.entity;

      const newMapItem: IMapItem = {
        id: this.currentItem.id,
        entity: {
          name: this.name.value,
          position: currentEntity.position,
        },
        actionType: ActionType.ADD_UPDATE,
        saved: true,
      };

      this._store.dispatch(save({ item: newMapItem }));
      this._store.dispatch(changeCurrentItem({ currentItem: newMapItem }));
      this.closeWindow();
      this._snackbar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        data: { message: 'מיקום נוסף בהצלחה', action: 'סגור' },
      });
    }
  }

  public cancel(): void {
    this._store.dispatch(changeAddMode({ addMode: false }));
    this._markersService.deleteMapItem(this.currentItem.id);
    this.closeWindow();
  }

  private closeWindow(): void {
    this.closeAddWindowEvent.next();
  }

  get name(): FormControl {
    return this._name;
  }

  get currentItem(): IMapItem {
    return this._currentItem;
  }

  set currentItem(mapItem: IMapItem) {
    this._currentItem = mapItem;
  }
}
