import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraService, ViewerConfiguration } from 'angular-cesium';
import { MarkersService } from '../markers.service';
import { EventBusService, Events } from '../event-bus.service';
import { Subscription } from 'rxjs';
import { MapItem } from '../map-item';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CameraService],
})
export class MapComponent implements OnInit {
  @Output()
  openEditWindowEvent: EventEmitter<string> = new EventEmitter<string>();
  eventbusSub: Subscription;

  constructor(
    private viewerConf: ViewerConfiguration,
    private eventbus: EventBusService,
    private markersService: MarkersService
  ) {
    this.viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      shouldAnimate: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      sceneModePicker: false,
    };

    const west = 31.5;
    const east = 38.5;
    const south = 29.0;
    const north = 34.0;
    const israelLocation = Cesium.Rectangle.fromDegrees(
      west,
      south,
      east,
      north
    );
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.025;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = israelLocation;

    this.viewerConf.viewerModifier = (viewer: any) => {
      viewer._cesiumWidget._creditContainer.style.display = 'none';

      viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 4 })
      );

      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this.eventbusSub = this.eventbus.on(
        Events.MarkerSelect,
        (mapItem: MapItem) => {
          viewer.camera.flyTo({
            destination: this.getFlyPosition(mapItem.entity.position),
          });
        }
      );
    };
  }

  ngOnInit(): void {}

  getFlyPosition = (position) => {
    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
    const DEFAULT_ALTITUDE = 50000;

    return Cesium.Cartesian3.fromDegrees(longitude, latitude, DEFAULT_ALTITUDE);
  };

  loadMap = () => {
    return this.markersService.getUpdatedMap();
  };

  openEditWindow(): void {
    this.openEditWindowEvent.next();
  }
}
