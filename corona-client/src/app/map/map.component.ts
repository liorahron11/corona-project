import { Component, OnInit } from '@angular/core';
import { CameraService, ViewerConfiguration } from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration, CameraService],
})
export class MapComponent implements OnInit {
  constructor(
    private viewerConf: ViewerConfiguration,
    private cameraService: CameraService
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      shouldAnimate: false,
      homeButton: true,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      mapMode2D: Cesium.MapMode2D.ROTATE,
    };

    const west = 30.0;
    const south = 28.0;
    const east = 40.0;
    const north = 35.0;
    const israelLocation = Cesium.Rectangle.fromDegrees(
      west,
      south,
      east,
      north
    );
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.005;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = israelLocation;

    // Will be called on viewer initialistion
    viewerConf.viewerModifier = (viewer: any) => {
      var layer = viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 3 })
      );
    };
  }

  ngOnInit(): void {}
}
