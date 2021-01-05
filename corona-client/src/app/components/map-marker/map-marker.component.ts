import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CesiumEvent,
  CesiumService,
  EventRegistrationInput,
  MapEventsManagerService,
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { EventBusService } from '../../services/event-bus.service';
import { Events } from '../../../events';
import { IMapItem } from '../../../map-item';
import { MarkersService } from '../../services/markers.service';
import { selectAddMode } from '../../store/outbreak-list.selector';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Output()
  public openEditWindow: EventEmitter<string> = new EventEmitter<string>();
  @Input() public entities: Observable<IMapItem>;
  private _MAP_MARKER_URL: string = environment.mapMarkerURL;
  private _addMode: boolean;

  constructor(
    private _eventManager: MapEventsManagerService,
    private _eventbus: EventBusService,
    private _store: Store,
    private _cesiumService: CesiumService,
    private _markersService: MarkersService
  ) {
    const viewer = this._cesiumService.getViewer();
    const eventRegistration: EventRegistrationInput = {
      event: CesiumEvent.LEFT_CLICK,
    };

    const clickEvent = this._eventManager.register(eventRegistration);

    this._eventbus.on(Events.TOGGLE_ADD_MODE, () => {
      if (this.addMode) {
        this.setCrosshairPointer(viewer);

        clickEvent.subscribe((result) => {
          const ellipsoid = viewer.scene.globe.ellipsoid;

          const cartesian = viewer.camera.pickEllipsoid(
            result.movement['position'],
            ellipsoid
          );
          const cartographic = ellipsoid.cartesianToCartographic(cartesian);
          const longitude: string = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(15);
          const latitude: string = Cesium.Math.toDegrees(
            cartographic.latitude
          ).toFixed(15);
          const height: string = Cesium.Math.toDegrees(
            cartographic.height
          ).toFixed(15);

          this._markersService.addMapItem(
            longitude + latitude,
            longitude.substring(1, 5) + latitude.substring(1, 6),
            Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
          );

          this.openEdit();
          this.setDefaultPointer(viewer);
          clickEvent.dispose();
        });
      } else {
        this.setDefaultPointer(viewer);
        clickEvent.dispose();
      }
    });
  }

  ngOnInit(): void {
    this._store
      .select(selectAddMode)
      .subscribe((subscriber) => (this._addMode = subscriber));
  }

  private openEdit(): void {
    this.openEditWindow.next();
  }

  private setCrosshairPointer(viewer): void {
    viewer._container.style.cursor = `crosshair`;
  }

  private setDefaultPointer(viewer): void {
    viewer._container.style.cursor = `default`;
  }

  get mapMarkerURL(): string {
    return this._MAP_MARKER_URL;
  }

  get addMode(): boolean {
    return this._addMode;
  }

  set addMode(value: boolean) {
    this._addMode = value;
  }
}
