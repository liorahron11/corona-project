import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraService, ViewerConfiguration } from 'angular-cesium';
import { MarkersService } from '../../services/markers.service/markers.service';
import {
  EventBusService,
  Events,
} from '../../services/event-bus.service/event-bus.service';
import { Observable, Subscription } from 'rxjs';
import { MapItem } from '../../../map-item';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CameraService],
})
export class MapComponent implements OnInit {
  @Output()
  private openEditWindowEvent: EventEmitter<string> = new EventEmitter<string>();
  private eventbusSub: Subscription;

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

    const west: Number = 31.5;
    const east: Number = 38.5;
    const south: Number = 29.0;
    const north: Number = 34.0;
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

  private getFlyPosition(position): Object {
    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
    const DEFAULT_ALTITUDE = 50000;

    return Cesium.Cartesian3.fromDegrees(longitude, latitude, DEFAULT_ALTITUDE);
  }

  public loadMap(): Observable<MapItem> {
    return this.markersService.getUpdatedMap();
  }

  public openEditWindow(): void {
    this.openEditWindowEvent.next();
  }
}
