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
import { MapComponent } from './components/map/map.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollerComponent } from './components/scroller/scroller.component';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { reducer } from './store/outbreak-list.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AddNewMarkerComponent } from './components/add-new-marker/add-new-marker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MarkerDetailsComponent } from './components/marker-details/marker-details.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    ScrollerComponent,
    ListComponent,
    MapMarkerComponent,
    AddNewMarkerComponent,
    SnackbarComponent,
    MarkerDetailsComponent,
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
    FormsModule,
    HttpClientModule,
    NzPopconfirmModule,
    StoreModule.forRoot({ storeState: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [CesiumService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
