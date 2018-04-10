import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEquipmentPage } from '../pages/add-equipment/add-equipment';
import { LoginPage } from '../pages/login/login';
import { ApiService } from '../providers/api.service';
import { AppData } from '../providers/app-data.service';
import { UtilitiesService } from '../providers/utilities.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEquipmentPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {

    }, {
      links: [
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: AddEquipmentPage, name: 'Add Equipment', segment: 'add-equipment' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEquipmentPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    AppData,
    UtilitiesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
