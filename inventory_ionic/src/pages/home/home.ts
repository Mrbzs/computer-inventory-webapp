import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppData } from '../../providers/app-data.service';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public searchTopic: string = 'Equipments';
  public searchResults: Array<any>;
  public searchValue: string = '';

  constructor(public navCtrl: NavController,
    public appData: AppData,
    public apiService: ApiService) {

  }

  ionViewWillEnter() {

    // Redirect user to login if not logged in
    if (!this.appData.isLoggedIn())
      this.navCtrl.setRoot('login');

    // Load equipments for default display
    this.apiService.getEquipmentByName('').subscribe( data => {
      this.searchResults = data;
      console.log('Success - get equipments', data);
    }, err => {
      console.log('Error - get equipments', err);
    });
  }

  onSearchChange() {
    switch (this.searchTopic) {
      case 'Equipments':
        this.apiService.getEquipmentByName(this.searchValue).subscribe( data => {
          this.searchResults = data;
          console.log('Success - get equipments by name', data);
        }, err => {
          console.log('Error - get equipments by name', err);
        });
        break;
      case 'Lab Assistants':
        this.apiService.getLabAssistantByName(this.searchValue).subscribe( data => {
          this.searchResults = data;
          console.log('Success - get lab assistants by name', data);
        }, err => {
          console.log('Error - get lab assistants by name', err);
        });
        break;
      case 'Staff':
        this.apiService.getStaffByName(this.searchValue).subscribe( data => {
          this.searchResults = data;
          console.log('Success - get staff by name', data);
        }, err => {
          console.log('Error - get staff by name', err);
        });
        break;
    }
  }

}
