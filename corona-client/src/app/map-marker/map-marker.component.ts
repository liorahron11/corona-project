import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Input() entities;
  mapMarker: string = 'http://localhost:9000/assets/map-marker';

  constructor() {}

  ngOnInit(): void {}
}
