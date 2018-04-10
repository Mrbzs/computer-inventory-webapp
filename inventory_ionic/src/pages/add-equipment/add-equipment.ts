import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Equipment, EquipmentType } from '../../models/equipment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../providers/utilities.service';
import { ApiService } from '../../providers/api.service';
import { AppData } from '../../providers/app-data.service';

@Component({
  selector: 'page-add-equipment',
  templateUrl: 'add-equipment.html',
})
export class AddEquipmentPage {

  // Get types from enum
  public types: Array<string> = Object.keys(EquipmentType).slice(Object.keys(EquipmentType).length/2);
  public addEquipmentForm: FormGroup;
  public error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public utilities: UtilitiesService,
    public apiService: ApiService,
    public appData: AppData) {

    this.addEquipmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ionViewWillEnter() {

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');
  }

  /**
   * Adds an equipment to database or displays error
   */
  addEquipment() {
    // Check if form valid
    if (!this.addEquipmentForm.valid) {
      if (this.addEquipmentForm.value.name == '')
        this.error = 'Please enter an equipment name';
      else if (this.addEquipmentForm.value.description == '')
        this.error = 'Please enter an equipment description';
      else this.error = 'Please select an equipment type';
      return;
    }
    this.error = '';

    // Generate equipmentID
    let equipmentId = 'EQ-'+this.utilities.randomString(10);

    // Create new equipment
    const newEquipment: Equipment = {
      id: equipmentId,
      name: this.addEquipmentForm.value.name,
      type: this.addEquipmentForm.value.type,
      description: this.addEquipmentForm.value.description,
      staffId: '-'
    };

    // Add equipment to database
    this.apiService.addEquipment(newEquipment).subscribe( response => {
      console.log('Success - Adding equipment', response);
      this.utilities.showAlert('Equipment successfully added', 'Success');
    }, err => {
      console.log('Error - Adding equipment', err);
      this.utilities.showAlert('Something went wrong. Please try again later', 'Error');
    });
  }

}
