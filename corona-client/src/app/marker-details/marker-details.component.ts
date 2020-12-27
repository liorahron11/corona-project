import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { City } from '../city';
import { MarkersService } from '../markers.service';
import { changeCurrentItem } from '../store/actions/outbreak-list.actions';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.css'],
})
export class MarkerDetailsComponent implements OnInit {
  currentItem: City;

  constructor(private store: Store, private markersService: MarkersService) {}

  ngOnInit(): void {
    this.store
      .select((state) => state['list'].currentItem)
      .subscribe((sub) => (this.currentItem = sub));
  }

  remove = () => {
    this.markersService.deleteMarker(this.currentItem['_id']);
    this.store.dispatch(changeCurrentItem({ currentItem: undefined }));
  };
}
