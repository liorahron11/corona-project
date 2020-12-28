import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CesiumEvent,
  CesiumEventModifier,
  CesiumService,
  EventRegistrationInput,
  MapEventsManagerService,
} from 'angular-cesium';
import { Subscription } from 'rxjs';
import { EventBusService, Events } from '../event-bus.service';
import { MarkersService } from '../markers.service';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Output() openEditWindow = new EventEmitter<string>();
  @Input() entities;
  mapMarker: string = 'http://localhost:9000/assets/map-marker';
  eventbusSub: Subscription;

  constructor(
    private eventManager: MapEventsManagerService,
    private eventbus: EventBusService,
    private store: Store,
    private cesiumService: CesiumService,
    private markersService: MarkersService
  ) {
    const viewer = cesiumService.getViewer();
    const eventRegistration: EventRegistrationInput = {
      event: CesiumEvent.LEFT_CLICK,
    };

    this.eventbusSub = this.eventbus.on(Events.ToggleAddMode, () => {
      let addMode: boolean;
      this.store
        .select((state) => state)
        .subscribe((subscriber) => (addMode = subscriber['list'].addMode));

      const clickEvent = this.eventManager.register(eventRegistration);

      if (addMode) {
        viewer._container.style.cursor = `crosshair`;

        clickEvent.subscribe((result) => {
          var ellipsoid = viewer.scene.globe.ellipsoid;

          var cartesian = viewer.camera.pickEllipsoid(
            result.movement['position'],
            ellipsoid
          );
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          var longitudeString = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(10);
          var latitudeString = Cesium.Math.toDegrees(
            cartographic.latitude
          ).toFixed(10);
          var heightString = Cesium.Math.toDegrees(cartographic.height).toFixed(
            10
          );

          markersService.addMarker(
            longitudeString + latitudeString,
            longitudeString.substring(1, 5) + latitudeString.substring(1, 6),
            Cesium.Cartesian3.fromDegrees(
              longitudeString,
              latitudeString,
              heightString
            ),
            Cesium.Cartesian3.fromDegrees(
              longitudeString,
              latitudeString,
              50000
            )
          );

          this.openEdit();
          viewer._container.style.cursor = 'default';
          clickEvent.dispose();
        });
      } else {
        viewer._container.style.cursor = 'default';
        clickEvent.dispose();
      }
    });
  }

  ngOnInit(): void {}

  openEdit(): void {
    this.openEditWindow.next();
  }
}
