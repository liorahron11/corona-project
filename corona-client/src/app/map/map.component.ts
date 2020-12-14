import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CameraService, ViewerConfiguration } from 'angular-cesium';
import { MarkersService } from '../markers.service';
import { EventBusService, Events } from '../event-bus.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CameraService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @Output() openEditWindowEvent = new EventEmitter<string>();
  eventbusSub: Subscription;
  pickMarker;

  constructor(
    private viewerConf: ViewerConfiguration,
    private eventbus: EventBusService,
    private markersService: MarkersService,
    private store: Store
  ) {
    viewerConf.viewerOptions = {
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

    viewerConf.viewerModifier = (viewer: any) => {
      viewer._cesiumWidget._creditContainer.style.display = 'none';

      viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 4 })
      );

      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this.eventbusSub = this.eventbus.on(Events.MarkerSelect, (city) => {
        viewer.camera.flyTo({
          destination: city.flyPosition,
        });
      });

      this.eventbusSub = this.eventbus.on(Events.ToggleAddMode, () => {
        let addMode: boolean;
        this.store
          .select((state) => state)
          .subscribe((subscriber) => (addMode = subscriber['list'].addMode));
        const canvas = viewer.scene.canvas;

        if (addMode) {
          viewer._container.style.cursor = `crosshair`;

          canvas.addEventListener(
            'click',
            (this.pickMarker = (e) => {
              var ellipsoid = viewer.scene.globe.ellipsoid;

              var cartesian = viewer.camera.pickEllipsoid(
                new Cesium.Cartesian3(e.clientX, e.clientY),
                ellipsoid
              );
              var cartographic = ellipsoid.cartesianToCartographic(cartesian);
              var longitudeString = Cesium.Math.toDegrees(
                cartographic.longitude
              ).toFixed(10);
              var latitudeString = Cesium.Math.toDegrees(
                cartographic.latitude
              ).toFixed(10);
              var heightString = Cesium.Math.toDegrees(
                cartographic.height
              ).toFixed(10);
              console.log('lon: ', longitudeString);
              console.log('lat: ', latitudeString);
              console.log('alt: ', heightString);

              markersService.addMarker(
                longitudeString + latitudeString,
                longitudeString.substring(1, 5) +
                  latitudeString.substring(1, 6),
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
              viewer._container.style.cursor = 'default';
              canvas.removeEventListener('click', this.pickMarker);
              this.openEditWindow();
            })
          );
        } else {
          viewer._container.style.cursor = 'default';
          canvas.removeEventListener('click', this.pickMarker);
        }
      });
    };
  }

  ngOnInit(): void {}

  loadMap = () => {
    return this.markersService.getUpdatedMap();
  };

  openEditWindow(): void {
    this.openEditWindowEvent.next();
  }
}
