import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppData } from '../../providers/app-data.service';
import { UtilitiesService } from '../../providers/utilities.service';
import { Staff } from '../../models/staff.model';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-add-staff',
  templateUrl: 'add-staff.html',
})
export class AddStaffPage {

  public addStaffForm: FormGroup;
  public error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public appData: AppData,
    public utilities: UtilitiesService,
    public apiService: ApiService) {

    this.addStaffForm = this.formBuilder.group({
      name: ['', Validators.required],
      office: ['', Validators.required]
    });
  }

  ionViewWillEnter() {

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');
  }

  /**
   * Adds a staff to the database
   */
  addStaff() {
    // Check if form valid
    if (!this.addStaffForm.valid) {
      if (this.addStaffForm.value.name == '')
        this.error = 'Please enter a staff name';
      else this.error = 'Please enter staff office';
      return;
    }
    this.error = '';

    // Generate staffID
    let staffId = 'ST-'+this.utilities.randomString(10);

    // Create new staff
    const newStaff: Staff = {
      id: staffId,
      name: this.addStaffForm.value.name,
      office: this.addStaffForm.value.office
    };

    // Add staff to database
    this.apiService.addStaff(newStaff).subscribe( response => {
      console.log('Success - Adding staff', response);
      this.utilities.showAlert('Staff successfully added', 'Success');
    }, err => {
      console.log('Error - Adding staff', err);
      this.utilities.showAlert('Something went wrong. Please try again later', 'Error');
    });
  }
}
