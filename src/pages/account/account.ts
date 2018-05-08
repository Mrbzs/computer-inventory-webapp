import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController,
    public appData: AppData) {
  }

  ionViewCanEnter() {
    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn()) {
      setTimeout(() => this.navCtrl.setRoot('login'));
    }
    return this.appData.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  /**
   * Logs the user out and redirects to login page
   */
  logout() {
    // Navigate to login page
    this.navCtrl.setRoot('login').then(() => {
      // Remove user from session and browser
      this.appData.user = null;
      this.appData.saveUsername('');
    });
  }

}
