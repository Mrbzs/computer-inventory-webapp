import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class UtilitiesService {

  constructor(public alertCtrl: AlertController) {

  }

  /**
   * Shows an alert with needed title/subtitle (AlertController)
   * @param subTitle Subtitle of the alert
   * @param title Title of the alert, default is 'Information'
   * @param okHandler Optional handler to be called when the user taps the OK button
   */
  showAlert(subTitle: string, title?: string, okHandler?: () => void) {
    if (!title) {
      title = 'Information';
    }
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
        {
          text: 'Ok',
          handler: okHandler
        }
      ]
    });
    alert.present();
  }

  /**
   * Shows an alert with needed title/subtitle (AlertController)
   * @param subTitle Subtitle of the alert
   * @param title Title of the alert, default is 'Confirm'
   * @param yesHandler Optional handler to be called when the user taps the YES button
   */
  showConfirmationAlert(subTitle: string, title?: string, yesHandler?: () => void) {
    if (!title) {
      title = 'Confirm';
    }
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
        {
          text: 'Yes',
          handler: yesHandler
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  /**
   * Capitalizes first letter of each word of a string
   *
   * @param text The string to be converted to title case
   * @return The string converted to title case
   */
  toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
