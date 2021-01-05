import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraService, ViewerConfiguration } from 'angular-cesium';
import { MarkersService } from '../../services/markers.service';
import { EventBusService } from '../../services/event-bus.service';
import { Events } from '../../../events';
import { Observable } from 'rxjs';
import { IMapItem } from '../../../map-item';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CameraService],
})
export class MapComponent implements OnInit {
  @Output()
  public openEditWindowEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _viewerConf: ViewerConfiguration,
    private _eventbus: EventBusService,
    private _markersService: MarkersService
  ) {
    this._viewerConf.viewerOptions = {
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

    const { west, south, east, north } = environment.initialMapLocation;
    const israelLocation = Cesium.Rectangle.fromDegrees(
      west,
      south,
      east,
      north
    );
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = israelLocation;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = environment.defaultViewFactor;

    this._viewerConf.viewerModifier = (viewer: any) => {
      viewer._cesiumWidget._creditContainer.style.display = 'none';

      viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 4 })
      );

      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this._eventbus.on(Events.MARKER_SELECT, (mapItem: IMapItem) => {
        viewer.camera.flyTo({
          destination: this.getFlyPosition(mapItem.entity.position),
        });
      });
    };
  }

  ngOnInit(): void {}

  private getFlyPosition(position): Object {
    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);

    return Cesium.Cartesian3.fromDegrees(
      longitude,
      latitude,
      environment.defaultFlyAltitude
    );
  }

  public loadMap(): Observable<IMapItem> {
    return this._markersService.getUpdatedMap();
  }

  public openEditWindow(): void {
    this.openEditWindowEvent.next();
  }
}
