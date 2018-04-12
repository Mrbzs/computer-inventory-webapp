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
   *
   * @param username The username to be checked
   * @param password The password to be checked
   * @return The logged in user as an observable or undefined if no user found
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
   *
   * @param userId The userId of the user
   * @return The user with the specified userId or undefined if no user found
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
   *
   * @param username The username to be checked
   * @return True if username exists, false otherwise
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
   *
   * @param equipment The equipment to be added
   * @return The equipment that was added on success or an error on failure
   */
  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.serverURL}/equipments`, equipment);
  }

  /**
   * Adds a staff to the database
   *
   * @param staff The staff to be added
   * @return The staff that was added on success or an error on failure
   */
  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.serverURL}/staff`, staff);
  }

  /**
   * Adds a lab assistant to the database
   *
   * @param labAssistant The lab assistant to be added
   * @return The lab assistant that was added on success or an error on failure
   */
  addLabAssistant(labAssistant: User): Observable<User> {
    return this.http.post<User>(`${this.serverURL}/users`, labAssistant);
  }

  /**
   * Gets all equipments containing specified name. Can be used to get
   * all equipments by using an empty string as name
   *
   * @param name The name to be searched in the database
   * @return An array of equipments containing specified name
   */
  getEquipmentByName(name: string): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(`${this.serverURL}/equipments`).map(data => {
      let result: Array<Equipment> = [];
      for (let equipment of data) {
        if (equipment.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
          result.push(equipment);
        }
      }
      return result;
    });
  }

  /**
   * Gets all entries containing specified name. Can be used to get
   * all lab assistants by using an empty string as name
   *
   * @param name The name to be searched in the database
   * @return An array of lab assistants containing specified name
   */
  getLabAssistantByName(name: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.serverURL}/users`).map(data => {
      let result: Array<User> = [];
      for (let user of data) {
        if (user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && user.role != 'Admin') {
          result.push(user);
        }
      }
      return result;
    });
  }

  /**
   * Gets all staff containing specified name. Can be used to get
   * all staff by using an empty string as name
   *
   * @param name The name to be searched in the database
   * @return An array of staff containing specified name
   */
  getStaffByName(name: string): Observable<Array<Staff>> {
    return this.http.get<Array<Staff>>(`${this.serverURL}/staff`).map(data => {
      let result: Array<Staff> = [];
      for (let staff of data) {
        if (staff.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
          result.push(staff);
        }
      }
      return result;
    });
  }

}
