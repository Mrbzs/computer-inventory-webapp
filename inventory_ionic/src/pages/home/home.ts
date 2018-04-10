import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public appData: AppData) {

    // Redirect user to login screen if he/she is not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot(LoginPage);
  }

}
