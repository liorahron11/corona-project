import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  AngularCesiumModule,
  AngularCesiumWidgetsModule,
  CesiumService,
} from 'angular-cesium';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FlexLayoutModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
  ],
  providers: [CesiumService],
  bootstrap: [AppComponent],
})
export class AppModule {}
