import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEquipmentPage } from '../pages/add-equipment/add-equipment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEquipmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {

    }, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: AddEquipmentPage, name: 'Add Equipment', segment: 'add-equipment' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEquipmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
