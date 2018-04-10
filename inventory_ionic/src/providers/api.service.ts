import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';
import { Equipment } from '../models/equipment.model';

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
        if (userId == user.id) {
          return user;
        }
      }
      return dummyUser;
    });
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.serverURL}/equipments`, equipment);
  }

}
