import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapItem } from '../mapItem';
import { MarkersService } from '../markers.service';
import { changeCurrentItem } from '../store/actions/outbreak-list.actions';
import { selectCurrentItem } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.css'],
})
export class MarkerDetailsComponent implements OnInit {
  currentItem: MapItem;

  constructor(private store: Store, private markersService: MarkersService) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (this.currentItem = sub));
  }

  remove = () => {
    this.markersService.deleteMarker(this.currentItem.id);
    this.store.dispatch(changeCurrentItem({ currentItem: undefined }));
  };

  parsedPosition = () => {
    const position = this.currentItem.entity.position;

    return ` ${position.x},
            ${position.y},
            ${position.z}`;
  };
}
