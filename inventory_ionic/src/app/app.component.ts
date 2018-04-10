import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { AddEquipmentPage } from '../pages/add-equipment/add-equipment';
import { LoginPage } from '../pages/login/login';
import { AppData } from '../providers/app-data.service';
import { ApiService } from '../providers/api.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  public rootPage: any = LoginPage;
  public pages: Array<{title: string, component: any, isAdminOnly: boolean}>;
  public activePage: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public appData: AppData,
    public apiService: ApiService) {

    platform.ready().then(() => {
      statusBar.styleDefault();
    });

    this.pages = [
      { title: 'Home', component: HomePage, isAdminOnly: false },
      { title: 'Add Equipment', component: AddEquipmentPage, isAdminOnly: true },
      // { title: 'Add Lab Assistant', component: AddLabAssistantPage, isAdminOnly: true },
      // { title: 'Add Staff', component: AddStaffPage, isAdminOnly: true },
      // { title: 'Delete Equipment', component: DeleteEquipmentPage, isAdminOnly: true },
      // { title: 'Delete Lab Assistant', component: DeleteLabAssistantPage, isAdminOnly: true },
      // { title: 'Delete Staff', component: DeleteStaffPage, isAdminOnly: true },
      // { title: 'Check-in Equipment', component: CheckInPage, isAdminOnly: false },
      // { title: 'Check-out Equipment', component: CheckOutPage, isAdminOnly: false },
      // { title: 'Settings', component: SettingsPage, isAdminOnly: false },
    ];

    this.activePage = this.pages[0];

    this.autoLogin();

  }

  /**
   * Checks if user exists in local browser storage and logs them in if so
   */
  autoLogin() {
    let userId = this.appData.getSavedUser();

    // Save user and navigate to home page
    if (userId) {
      this.apiService.getUserById(userId).subscribe( user => {
        if (user) {
          this.appData.user = user;
          this.nav.setRoot(HomePage);
        }
      });
    }
  }

  /**
   * Opens a page from the side menu
   * @param page The page to open
   */
  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  /**
   * Checks if page is currently active
   * @param page The page to check if active
   * @return True if page is active, False otherwise
   */
  checkActive(page) : boolean {
    return page == this.activePage;
  }

}

