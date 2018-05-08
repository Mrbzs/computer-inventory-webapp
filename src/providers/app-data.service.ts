import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable()
export class AppData {

  private _user: User; // Currently logged in user

  /**
   * Getter method for logged in user
   *
   * @return The logged in user
   */
  get user(): User {
    return this._user;
  }

  /**
   * Setter method for logged in user
   *
   * @param user The user that has just logged in
   */
  set user(user: User) {
    this._user = user;
  }

  /**
   * Gets a user from local browser storage if he/she has logged in before
   *
   * @return The userId of the user
   */
  getSavedUser(): string {
    return window.localStorage['username'];
  }

  /**
   * Saves a user to local browser storage for future auto login
   *
   * @param username The username of the user to be saved in browser storage
   * */
  saveUsername(username: string) {
    window.localStorage['username'] = username;
  }

  /**
   * Checks if a user is logged in
   *
   * @return True if user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return !!this.user;
  }

  /**
   * Checks if a user is logged in as an admin
   *
   * @return True if user is logged in as admin, false otherwise
   */
  isAdmin(): boolean {
    return this.isLoggedIn() && this.user.role == 'Admin';
  }

}
