import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public appData: AppData) {

  }

  ionViewWillEnter() {

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');
  }

}
