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
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollerComponent } from './scroller/scroller.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    ScrollerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FlexLayoutModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    MatToolbarModule,
    FontAwesomeModule,
    ScrollingModule,
    MatListModule,
  ],
  providers: [CesiumService],
  bootstrap: [AppComponent],
})
export class AppModule {}
