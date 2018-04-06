import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../providers/api.service';
import { HomePage } from '../home/home';
import { AppData } from '../../providers/app-data.service';

import * as shajs from 'sha.js';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public appData: AppData) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      if (response) {
        // Store user in session and browser
        this.appData.user = response;
        this.appData.saveUser(response.id);

        // Navigate to home page
        this.navCtrl.setRoot(HomePage);
      }
      else this.error = 'Invalid username/password combination';
    });

  }
}
