import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  public staffExists: boolean = false;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public appData: AppData,
    public utilities: UtilitiesService,
    public apiService: ApiService) {

    this.addStaffForm = this.formBuilder.group({
      name: ['', Validators.required],
      office: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9 +-]+$/)]],
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
   * Adds a staff to the database
   */
  addStaff() {
    // Check if form valid
    if (!this.addStaffForm.valid) {
      if (this.addStaffForm.value.name == '')
        this.error = 'Please enter a staff name';
      else if (this.addStaffForm.value.office == '')
        this.error = 'Please enter staff office';
      else if (!this.addStaffForm.get('email').valid)
        this.error = 'Please enter a valid e-mail';
      else this.error = 'Please enter a valid phone number';
      return;
    }
    this.error = '';

    // Create new staff
    const newStaff: Staff = {
      name: this.utilities.toTitleCase(this.addStaffForm.value.name),
      office: this.addStaffForm.value.office,
      phone: this.addStaffForm.value.phone,
      email: this.addStaffForm.value.email ? this.addStaffForm.value.email : '-'
    };

    // Check if staff already exists
    this.apiService.getEntriesByName('', 'staff').subscribe(response => {
      for (let staff of response) {
        if (newStaff.name == staff.name && newStaff.office == staff.office && newStaff.phone == staff.phone && newStaff.email == staff.email)
          this.staffExists = true;
      }

      if (this.staffExists) {
        this.staffExists = !this.staffExists;
        this.error = 'Staff already exists in database';
      } else {
        // Add staff to database
        this.apiService.addStaff(newStaff).subscribe( response => {
          console.log('Success - Adding staff', response);

          // Clear form
          this.addStaffForm.reset();

          this.utilities.showAlert('Staff successfully added', 'Success');
        }, err => {
          console.log('Error - Adding staff', err);
          this.utilities.showAlert('Something went wrong. Please try again later', 'Error');
        });
      }
    });
  }
}
