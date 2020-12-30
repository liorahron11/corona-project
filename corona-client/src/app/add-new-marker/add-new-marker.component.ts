import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Entity } from '../entity';
import { MarkersService } from '../markers.service';
import {
  changeAddMode,
  changeCurrentItem,
  save,
} from '../store/actions/outbreak-list.actions';
import { selectList } from '../store/outbreak-list.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MapItem } from '../mapItem';
import { ActionType } from 'angular-cesium';

@Component({
  selector: 'app-add-new-marker',
  templateUrl: './add-new-marker.component.html',
  styleUrls: ['./add-new-marker.component.css'],
})
export class AddNewMarkerComponent implements OnInit {
  @Output() closeAddWindowEvent = new EventEmitter<string>();
  name = new FormControl('', [Validators.required]);
  currentItem: MapItem;

  constructor(
    private store: Store,
    private markersService: MarkersService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let list: MapItem[] = [];

    this.store
      .select(selectList)
      .subscribe((subscriber) => (list = subscriber));

    this.currentItem = list[list.length - 1];
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'שם לא הוזן';
    }
  }

  save = () => {
    if (!this.name.hasError('required')) {
      const currentEntity = this.currentItem.entity;
      const newEntity: Entity = {
        name: this.name.value,
        position: currentEntity.position,
        flyPosition: currentEntity.flyPosition,
      };

      const newMapItem: MapItem = {
        id: this.currentItem.id,
        entity: newEntity,
        actionType: ActionType.ADD_UPDATE,
      };

      this.store.dispatch(save({ item: newMapItem }));
      this.store.dispatch(changeCurrentItem({ currentItem: newMapItem }));
      this.closeWindow();
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        data: { message: 'מיקום נוסף בהצלחה', action: 'סגור' },
      });
    }
  };

  cancel = () => {
    this.store.dispatch(changeAddMode({ addMode: false }));
    this.markersService.deleteMarker(this.currentItem.id);
    this.closeWindow();
  };

  closeWindow(): void {
    this.closeAddWindowEvent.next();
  }
}
