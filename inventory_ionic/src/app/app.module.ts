import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddEquipmentPage } from '../pages/add-equipment/add-equipment';
import { AddLabAssistantPage } from '../pages/add-lab-assistant/add-lab-assistant';
import { AddStaffPage } from '../pages/add-staff/add-staff';
import { ApiService } from '../providers/api.service';
import { AppData } from '../providers/app-data.service';
import { UtilitiesService } from '../providers/utilities.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddEquipmentPage,
    AddLabAssistantPage,
    AddStaffPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      //locationStrategy: 'path'
    }, {
      links: [
        { component: HomePage, name: 'home', segment: 'home' },
        { component: LoginPage, name: 'login', segment: 'login' },
        { component: AddEquipmentPage, name: 'add-equipment', segment: 'add-equipment' },
        { component: AddLabAssistantPage, name: 'add-lab-assistant', segment: 'add-lab-assistant' },
        { component: AddStaffPage, name: 'add-staff', segment: 'add-staff' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddEquipmentPage,
    AddLabAssistantPage,
    AddStaffPage
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
