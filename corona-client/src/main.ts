import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/');
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxOWFhNDU5Yy02MTU1LTQ2MWQtYjE5Ni05YmMxMGIxMTM4M2EiLCJpZCI6MzkzMTMsImlhdCI6MTYwNzQzMjI3OH0.LHUuQWZskMyOnqP1339t_32uNg6zn0ZAbldlIbI7ztk';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
