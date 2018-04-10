import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { Equipment } from '../models/equipment.model';
import { Staff } from '../models/staff.model';

@Injectable()
export class ApiService {

  private serverURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

  /**
   * Checks if the given combination of username and password is valid
   * @param username The username to be checked
   * @param password The password to be checked
   *
   * @return Returns the logged in user as an observable or undefined if no user found
   */
  login(username: string, password: string): Observable<User> {
    return this.http.get<Array<User>>(`${this.serverURL}/users`).map(data => {
      let dummyUser: User;
      for (let user of data) {
        if (username === user.username && password === user.password) {
          return user;
        }
      }
      return dummyUser;
    });
  }

  /**
   * Gets a user with the specified userId
   * @param userId The userId of the user
   *
   * @return Returns the user with the specified userId or undefined if no user found
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<Array<User>>(`${this.serverURL}/users`).map(data => {
      let dummyUser: User;
      for (let user of data) {
        if (userId === user.id) {
          return user;
        }
      }
      return dummyUser;
    });
  }

  /**
   * Checks if a username is already registered
   * @param username The username to be checked
   *
   * @return Returns true if username exists, false otherwise
   */
  userExists(username: string): Observable<boolean> {
    return this.http.get<Array<User>>(`${this.serverURL}/users`).map(data => {
      for (let user of data) {
        if (username === user.username) {
          return true;
        }
      }
      return false;
    });
  }

  /**
   * Adds an equipment to the database
   * @param equipment The equipment to be added
   *
   * @return Returns the equipment that was added on success or an error on failure
   */
  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.serverURL}/equipments`, equipment);
  }

  /**
   * Adds a staff to the database
   * @param staff The staff to be added
   *
   * @return Returns the staff that was added on success or an error on failure
   */
  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.serverURL}/staff`, staff);
  }

  /**
   * Adds a lab assistant to the database
   * @param labAssistant The lab assistant to be added
   *
   * @return Returns the lab assistant that was added on success or an error on failure
   */
  addLabAssistant(labAssistant: User): Observable<User> {
    return this.http.post<User>(`${this.serverURL}/users`, labAssistant);
  }
}
