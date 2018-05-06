import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';
import { User } from '../../models/user.model';
import { ApiService } from '../../providers/api.service';
import { UtilitiesService } from '../../providers/utilities.service';

@Component({
  selector: 'page-lab-assistant-details',
  templateUrl: 'lab-assistant-details.html',
})
export class LabAssistantDetailsPage {

  public labAssistant: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public alertCtrl: AlertController,
    public apiService: ApiService,
    public utilities: UtilitiesService) {
    this.labAssistant = this.navParams.get('item');
  }

  ionViewCanEnter() {
    // Redirect user to home if no lab assistant
    if (!this.labAssistant) {
      setTimeout(() => this.navCtrl.setRoot('home'));
    }
    return this.labAssistant;
  }

  /**
   * Shows alert to update lab assistant details and then updates lab assistant in database
   */
  updateInfo() {
    // Create alert
    const alert = this.alertCtrl.create({
      title: 'Change details',
      message: 'Leave blank for no change',
      inputs: [
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
            let newLabAssistant: User = Object.assign({}, this.labAssistant); // Copy object
            if (data.email) newLabAssistant.email = data.email;

            // Update database
            this.apiService.updateEntryById(this.labAssistant._id, 'users', newLabAssistant).subscribe(() => {
              this.utilities.showAlert('Details updated successfully');
              this.labAssistant = newLabAssistant;
            }, () => {
              this.utilities.showAlert('Error updating details', 'Error');
            });

          }
        }
      ]
    });

    alert.present();
  }

}
