import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../providers/api.service';
import { AppData } from '../../providers/app-data.service';
import { UtilitiesService } from '../../providers/utilities.service';

import * as shajs from 'sha.js';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public error: string = '';

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public appData: AppData,
    public utilities: UtilitiesService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Logs the user in or displays error
   */
  login() {
    // Check if form valid
    if (!this.loginForm.valid) {
      if (this.loginForm.value.username == '')
        this.error = 'Please enter a username';
      else this.error = 'Please enter a password';
      return;
    }
    this.error = '';

    let password: string = shajs('sha256').update(this.loginForm.value.password).digest('hex');

    this.apiService.login(this.loginForm.value.username, password).subscribe(response => {
      if (response.length > 0) {
        // Store user in session and browser
        this.appData.user = response[0];
        this.appData.saveUsername(response[0].username);

        // Navigate to home page
        this.navCtrl.setRoot('home');
      }
      else this.error = 'Invalid username/password combination';
    }, () => {
      this.utilities.showAlert('Internal server error. Please try again later', 'Error');
    });

  }
}
