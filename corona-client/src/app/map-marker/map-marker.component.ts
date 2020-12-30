import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CesiumEvent,
  CesiumService,
  EventRegistrationInput,
  MapEventsManagerService,
} from 'angular-cesium';
import { Subscription } from 'rxjs';
import { EventBusService, Events } from '../event-bus.service';
import { MapItem } from '../mapItem';
import { MarkersService } from '../markers.service';
import { selectAddMode } from '../store/outbreak-list.selector';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Output() openEditWindow: EventEmitter<string> = new EventEmitter<string>();
  @Input() entities: MapItem[];
  MAP_MARKER_URL: string = 'http://localhost:9000/assets/map-marker';
  eventbusSub: Subscription;

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
      let addMode: boolean;
      this.store
        .select(selectAddMode)
        .subscribe((subscriber) => (addMode = subscriber));

      if (addMode) {
        this.setCrosshairPointer(viewer);

        clickEvent.subscribe((result) => {
          const ellipsoid = viewer.scene.globe.ellipsoid;

          const cartesian = viewer.camera.pickEllipsoid(
            result.movement['position'],
            ellipsoid
          );
          const cartographic = ellipsoid.cartesianToCartographic(cartesian);
          const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
          const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
          const alt = Cesium.Math.toDegrees(cartographic.height).toFixed(10);

          this.markersService.addMarker(
            lon + lat,
            lon.substring(1, 5) + lat.substring(1, 6),
            Cesium.Cartesian3.fromDegrees(lon, lat, alt),
            Cesium.Cartesian3.fromDegrees(lon, lat, 50000)
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

  ngOnInit(): void {}

  openEdit(): void {
    this.openEditWindow.next();
  }

  setCrosshairPointer(viewer): void {
    viewer._container.style.cursor = `crosshair`;
  }

  setDefaultPointer(viewer): void {
    viewer._container.style.cursor = `default`;
  }
}
