import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMapItem } from '../../../map-item';
import { MarkersService } from '../../services/markers.service/markers.service';
import { changeCurrentItem } from '../../store/outbreak-list.actions';
import { selectCurrentItem } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.css'],
})
export class MarkerDetailsComponent implements OnInit {
  public currentItem: IMapItem;

  constructor(private store: Store, private markersService: MarkersService) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrentItem)
      .subscribe((sub) => (this.currentItem = sub));
  }

  public remove(): void {
    this.markersService.deleteMapItem(this.currentItem.id);
    this.store.dispatch(changeCurrentItem({ currentItem: undefined }));
  }

  public parsedPosition(): string {
    const position = this.currentItem.entity.position;

    return ` ${position.x},
            ${position.y},
            ${position.z}`;
  }
}
