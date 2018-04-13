import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppData } from '../../providers/app-data.service';
import { UtilitiesService } from '../../providers/utilities.service';
import { ApiService } from '../../providers/api.service';
import { User } from '../../models/user.model';

import * as shajs from 'sha.js';

@Component({
  selector: 'page-add-lab-assistant',
  templateUrl: 'add-lab-assistant.html',
})
export class AddLabAssistantPage {

  public addLabAssistantForm: FormGroup;
  public error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public appData: AppData,
    public utilities: UtilitiesService,
    public apiService: ApiService) {

    this.addLabAssistantForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewWillEnter() {

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');
  }

  /**
   * Adds a lab assistant to the database
   */
  addLabAssistant() {
    // Check if form valid
    if (!this.addLabAssistantForm.valid) {
      if (this.addLabAssistantForm.value.name == '')
        this.error = 'Please enter a lab assistant name';
      else if (this.addLabAssistantForm.value.username == '')
        this.error = 'Please enter username for the lab assistant';
      else this.error = 'Please enter password for the lab assistant';
      return;
    }

    // Check if username already exists
    this.apiService.getUserByUsername(this.addLabAssistantForm.value.username).subscribe(response => {
      if (response.length) {
        this.error = 'Username already in use. Please choose another one';
      }
      else this.error = '';
    }, err => {
      console.log(err);
    }, () => {
      if (!this.error) {

        // Generate labAssistantID
        let labAssistantId = 'LA-' + this.utilities.randomString(10);

        // Create new lab assistant
        let password: string = shajs('sha256').update(this.addLabAssistantForm.value.password).digest('hex');
        const newLabAssistant: User = {
          id: labAssistantId,
          name: this.utilities.toTitleCase(this.addLabAssistantForm.value.name),
          role: 'Lab Assistant',
          username: this.addLabAssistantForm.value.username,
          password: password
        };

        // Add lab assistant to database
        this.apiService.addLabAssistant(newLabAssistant).subscribe(response => {
          console.log('Success - Adding lab assistant', response);
          this.utilities.showAlert('Lab assistant successfully added. They can now login and use the system.', 'Success');
        }, err => {
          console.log('Error - Adding staff', err);
          this.utilities.showAlert('Something went wrong. Please try again later', 'Error');
        });
      }
    });
  }

}
