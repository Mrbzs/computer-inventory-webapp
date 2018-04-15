import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';
import { ApiService } from '../../providers/api.service';
import { UtilitiesService } from '../../providers/utilities.service';
import { Equipment } from '../../models/equipment.model';

@Component({
  selector: 'page-equipment-details',
  templateUrl: 'equipment-details.html',
})
export class EquipmentDetailsPage {

  public equipment: Equipment;
  public showStaff: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public apiService: ApiService,
    public utilities: UtilitiesService) {
    this.equipment = this.navParams.get('item');

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');

  }

  /**
   * Directs to home page where user can choose staff to assign using search features
   */
  assignStaff() {
    this.navCtrl.setRoot('home', {equipment: this.equipment});
  }

  /**
   * Removes the assigned staff from the equipment
   */
  removeStaff() {
    let newEquipment: Equipment = Object.assign({}, this.equipment); // Copy object
    newEquipment.staff = null;

    // Update equipment
    this.apiService.updateEntryById(this.equipment._id, 'equipments', newEquipment).subscribe(() => {
        this.utilities.showAlert('Staff assigned successfully', '', () => {
        this.equipment.staff = null;
      });
    }, () => {
      this.utilities.showAlert('Error removing staff');
    });
  }

  /**
   * Shows/hides staff info on user clicks
   */
  toggleStaffInfo() {
    this.showStaff = !this.showStaff;
  }
}
