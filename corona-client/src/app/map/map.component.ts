import { Component, OnInit } from '@angular/core';
import { ViewerConfiguration } from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration], // Don't forget to Provide it
})
export class MapComponent implements OnInit {
  constructor(private viewerConf: ViewerConfiguration) {
    // viewerOptions will be passed the Cesium.Viewer contstuctor
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
      mapMode2D: Cesium.MapMode2D.ROTATE,
    };

    // Will be called on viewer initialistion
    viewerConf.viewerModifier = (viewer: any) => {
      // Remove default double click zoom behaviour
      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    };
  }

  ngOnInit(): void {}
}
