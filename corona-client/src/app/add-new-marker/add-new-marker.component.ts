import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { City } from '../city';
import { MarkersService } from '../markers.service';
import {
  add,
  changeAddMode,
  remove,
  save,
} from '../store/actions/outbreak-list.actions';
import { selectList } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-add-new-marker',
  templateUrl: './add-new-marker.component.html',
  styleUrls: ['./add-new-marker.component.css'],
})
export class AddNewMarkerComponent implements OnInit {
  @Output() closeAddWindowEvent = new EventEmitter<string>();
  name = new FormControl('', [Validators.required]);
  currentItem: City;

  constructor(private store: Store, private markersService: MarkersService) {}

  ngOnInit(): void {
    let list = [];

    this.store
      .select(selectList)
      .subscribe((subscriber) => (list = subscriber['list']));

    this.currentItem = list[list.length - 1];
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'שם לא הוזן';
    }
  }

  save = () => {
    if (!this.name.hasError('required')) {
      const newMarker: City = {
        id: this.currentItem.id,
        name: this.name.value,
        position: this.currentItem.position,
        flyPosition: this.currentItem.flyPosition,
      };

      this.store.dispatch(save({ item: newMarker }));
      this.closeWindow();
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
