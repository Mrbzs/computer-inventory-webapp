import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
    public formBuilder: FormBuilder,
    public appData: AppData,
    public utilities: UtilitiesService,
    public apiService: ApiService) {

    this.addLabAssistantForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', this.emailOrEmpty]
    });
  }

  ionViewCanEnter() {
    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn()) {
      setTimeout(() => this.navCtrl.setRoot('login'));
    }

    // Redirect user to home if not admin
    else if (!this.appData.isAdmin()) {
      setTimeout(() => this.navCtrl.setRoot('home'));
    }

    return this.appData.isAdmin();
  }

  /**
   * Custom validator for e-mail. Can be empty or valid email
   */
  emailOrEmpty(control: AbstractControl): ValidationErrors | null {
    return control.value === '' ? null : Validators.email(control);
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
      else if (this.addLabAssistantForm.value.password == '')
        this.error = 'Please enter password for the lab assistant';
      else this.error = 'Please enter a valid e-mail';
      return;
    }

    // Check if username already exists
    this.apiService.getUsersByUsername(this.addLabAssistantForm.value.username).subscribe(response => {
      if (response.length > 0) {
        this.error = 'Username already in use. Please choose another one';
      }
      else this.error = '';
    }, err => {
      console.log(err);
    }, () => {
      if (!this.error) {

        // Create new lab assistant
        let password: string = shajs('sha256').update(this.addLabAssistantForm.value.password).digest('hex');
        const newLabAssistant: User = {
          name: this.utilities.toTitleCase(this.addLabAssistantForm.value.name),
          role: 'Lab Assistant',
          username: this.addLabAssistantForm.value.username,
          password: password,
          email: this.addLabAssistantForm.value.email ? this.addLabAssistantForm.value.email : '-'
        };

        // Add lab assistant to database
        this.apiService.addLabAssistant(newLabAssistant).subscribe(response => {
          console.log('Success - Adding lab assistant', response);

          // Clear form
          this.addLabAssistantForm.reset();

          this.utilities.showAlert('Lab assistant successfully added. They can now login and use the system.', 'Success');
        }, err => {
          console.log('Error - Adding staff', err);
          this.utilities.showAlert('Something went wrong. Please try again later', 'Error');
        });
      }
    });
  }

}
