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
   * @return The logged in user as an observable or null if no user found
   */
  login(username: string, password: string): Observable<User> {
    return this.getUserByUsername(username).map( user => {
      if (user.password == password)
        return user;
      return null;
    });
  }

  /**
   * Gets a user with the specified username
   *
   * @param username The username of the user
   * @return The user with the specified username or empty array if no user found
   */
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<User>(`${this.serverURL}/users/${username}`);
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
   * Gets all equipments containing specified name
   *
   * @param name The name to be searched in the database
   * @return An array of equipments containing specified name
   */
  getEquipmentByName(name: string): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(`${this.serverURL}/equipments`).map(equipments => {
      let results: Array<Equipment> = [];
      for (let equipment of equipments) {
        if (equipment.name.toLowerCase().includes(name.toLowerCase()))
          results.push(equipment);
      }
      return results;
    });
  }

  /**
   * Gets all entries containing specified name
   *
   * @param name The name to be searched in the database
   * @return An array of lab assistants containing specified name
   */
  getLabAssistantByName(name: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.serverURL}/users`).map(users => {
      let results: Array<User> = [];
      for (let user of users) {
        if (user.name.toLowerCase().includes(name.toLowerCase()) && user.role == 'Lab Assistant')
          results.push(user);
      }
      return results;
    });
  }

  /**
   * Gets all staff containing specified name
   *
   * @param name The name to be searched in the database
   * @return An array of staff containing specified name
   */
  getStaffByName(name: string): Observable<Array<Staff>> {
    return this.http.get<Array<Staff>>(`${this.serverURL}/staff`).map(allStaff => {
      let results: Array<Staff> = [];
      for (let staffMember of allStaff) {
        if (staffMember.name.toLowerCase().includes(name.toLowerCase()))
          results.push(staffMember);
      }
      return results;
    });
  }

}
