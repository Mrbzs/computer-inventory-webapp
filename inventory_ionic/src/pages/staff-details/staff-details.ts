import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';
import { ApiService } from '../../providers/api.service';
import { UtilitiesService } from '../../providers/utilities.service';
import { Staff } from '../../models/staff.model';
import { Equipment } from '../../models/equipment.model';

@Component({
  selector: 'page-staff-details',
  templateUrl: 'staff-details.html',
})
export class StaffDetailsPage {

  public staff: Staff;
  public showEquipments: boolean = false;
  public equipments: Array<Equipment>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public alertCtrl: AlertController,
    public apiService: ApiService,
    public utilities: UtilitiesService) {
    this.staff = this.navParams.get('item');
  }

  ionViewCanEnter() {
    // Redirect user to home if no staff
    if (!this.staff) {
      setTimeout(() => this.navCtrl.setRoot('home'));
    }
    return this.staff;
  }

  ionViewWillEnter() {
    // Get equipments
    this.apiService.getEquipmentsByStaff(this.staff).subscribe(response => {
      console.log('Success - Loaded equipments', response);
      this.equipments = response;
    }, () => {
      console.log('Error - could not load equipments');
    });
  }

  /**
   * Shows alert to update staff details and then updates staff in database
   */
  updateInfo() {
    // Create alert
    const alert = this.alertCtrl.create({
      title: 'Change details',
      message: 'Leave blank for no change',
      inputs: [
        {
          name: 'office',
          placeholder: 'New office'
        },
        {
          name: 'email',
          placeholder: 'New e-mail'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change',
          handler: data => {
            let newStaff: Staff = Object.assign({}, this.staff); // Copy object
            if (data.office) newStaff.office = data.office;
            if (data.email) newStaff.email = data.email;

            // Update database
            this.apiService.updateEntryById(this.staff._id, 'staff', newStaff).subscribe(() => {
              this.utilities.showAlert('Details updated successfully');
              this.staff = newStaff;
            }, () => {
              this.utilities.showAlert('Error updating details', 'Error');
            });

          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Shows/hides equipments for the staff
   */
  toggleEquipments() {
    this.showEquipments = !this.showEquipments;
  }

}
