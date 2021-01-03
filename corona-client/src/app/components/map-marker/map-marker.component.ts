import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CesiumEvent,
  CesiumService,
  EventRegistrationInput,
  MapEventsManagerService,
} from 'angular-cesium';
import { Observable, Subscription } from 'rxjs';
import { EventBusService, Events } from '../../services/event-bus.service';
import { IMapItem } from '../../../map-item';
import { MarkersService } from '../../services/markers.service';
import { selectAddMode } from '../../store/outbreak-list.selector';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Output()
  public openEditWindow: EventEmitter<string> = new EventEmitter<string>();
  @Input() public entities: Observable<IMapItem>;
  private _MAP_MARKER_URL: string = 'http://localhost:9000/assets/map-marker';
  private _eventbusSub: Subscription;
  private _addMode: boolean;

  constructor(
    private eventManager: MapEventsManagerService,
    private eventbus: EventBusService,
    private store: Store,
    private cesiumService: CesiumService,
    private markersService: MarkersService
  ) {
    const viewer = this.cesiumService.getViewer();
    const eventRegistration: EventRegistrationInput = {
      event: CesiumEvent.LEFT_CLICK,
    };

    const clickEvent = this.eventManager.register(eventRegistration);

    this.eventbusSub = this.eventbus.on(Events.ToggleAddMode, () => {
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

          this.markersService.addMapItem(
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
    this.store
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

  set eventbusSub(value: Subscription) {
    this._eventbusSub = value;
  }
}
