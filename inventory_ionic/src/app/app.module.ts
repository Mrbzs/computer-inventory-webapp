import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddEquipmentPage } from '../pages/add-equipment/add-equipment';
import { AddLabAssistantPage } from '../pages/add-lab-assistant/add-lab-assistant';
import { AddStaffPage } from '../pages/add-staff/add-staff';
import { LabAssistantDetailsPage } from '../pages/lab-assistant-details/lab-assistant-details';
import { EquipmentDetailsPage } from '../pages/equipment-details/equipment-details';
import { StaffDetailsPage } from '../pages/staff-details/staff-details';
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
    AddStaffPage,
    LabAssistantDetailsPage,
    EquipmentDetailsPage,
    StaffDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'home', segment: 'home' },
        { component: LoginPage, name: 'login', segment: 'login' },
        { component: AddEquipmentPage, name: 'add-equipment', segment: 'add-equipment' },
        { component: AddLabAssistantPage, name: 'add-lab-assistant', segment: 'add-lab-assistant' },
        { component: AddStaffPage, name: 'add-staff', segment: 'add-staff' },
        { component: LabAssistantDetailsPage, name: 'lab-assistant-details', segment: 'lab-assistant-details' },
        { component: EquipmentDetailsPage, name: 'equipment-details', segment: 'equipment-details' },
        { component: StaffDetailsPage, name: 'staff-details', segment: 'staff-details' }
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
    AddStaffPage,
    LabAssistantDetailsPage,
    EquipmentDetailsPage,
    StaffDetailsPage
  ],
  providers: [
    StatusBar,
    ApiService,
    AppData,
    UtilitiesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
