import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapItem } from '../../../map-item';
import { MarkersService } from '../../services/markers.service/markers.service';
import { changeCurrentItem } from '../../store/outbreak-list.actions';
import { selectCurrentItem } from '../../store/outbreak-list.selector';

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

  private remove(): void {
    this.markersService.deleteMapItem(this.currentItem.id);
    this.store.dispatch(changeCurrentItem({ currentItem: undefined }));
  }

  private parsedPosition(): string {
    const position = this.currentItem.entity.position;

    return ` ${position.x},
            ${position.y},
            ${position.z}`;
  }
}
