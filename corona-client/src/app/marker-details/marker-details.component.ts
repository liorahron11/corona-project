import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { City } from '../city';
import { MarkersService } from '../markers.service';

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
    this.markersService.deleteMarker(this.currentItem.id);
  };
}
