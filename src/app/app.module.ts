import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {FormPage} from '../pages/form/form';
import {MapComponent} from '../components/map/map';
import {LocatorComponent} from '../components/locator/locator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage,
    MapComponent,
    LocatorComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
