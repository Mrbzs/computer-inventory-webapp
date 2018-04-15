import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
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
   * @return An array of the user if username and password match, otherwise empty array
   */
  login(username: string, password: string): Observable<Array<User>> {
    return this.getUsersByUsername(username).map( users => {
      let result: Array<User> = [];
      for (let user of users) {
        if (user.password == password)
          result.push(user);
      }
      return result;
    }, err => {
      return err;
    });
  }

  /**
   * Gets users with the specified username
   *
   * @param username The username to be searched
   * @return An array of users with specified username
   */
  getUsersByUsername(username: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.serverURL}/users/${username}`).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Adds an equipment to the database
   *
   * @param equipment The equipment to be added
   * @return The equipment that was added on success or an error on failure
   */
  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.serverURL}/equipments`, equipment).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Adds a staff to the database
   *
   * @param staff The staff to be added
   * @return The staff that was added on success or an error on failure
   */
  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.serverURL}/staff`, staff).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Adds a lab assistant to the database
   *
   * @param labAssistant The lab assistant to be added
   * @return The lab assistant that was added on success or an error on failure
   */
  addLabAssistant(labAssistant: User): Observable<User> {
    return this.http.post<User>(`${this.serverURL}/users`, labAssistant).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Gets all entries in specific collection containing specified name. Can be used to
   * get all entries by specifying a blank nam
   *
   * @param name The name to be searched in the database
   * @param collection The collection to be queried
   * @return An array of documents containing specified name
   */
  getEntriesByName(name: string, collection: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.serverURL}/${collection}`).pipe(
      map(documents => {
        let result: Array<any> = [];
        for (let document of documents) {
          if (document.name.toLowerCase().includes(name.toLowerCase()) && document.role != 'Admin') {
            result.push(document);
          }
        }
        return result;
      }),
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Deletes equipment/lab assistant/staff by id from database
   *
   * @param documentId The documentId of the document to be deleted
   * @param collection The collection to be deleted from
   * @return True on success, false if id not found or the error if an error occurs
   */
  deleteEntryById(documentId: string, collection: string): Observable<any> {
    return this.http.delete<any>(`${this.serverURL}/${collection}/${documentId}`).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Updates a document by id
   *
   * @param documentId The documentId of the document to be updated
   * @param collection The collection to be updated from
   * @param updatedObject The object with the updated values
   * @return True on success, false if id not found or the error if an error occurs
   */
  updateEntryById(documentId: string, collection: string, updatedObject: any): Observable<boolean> {
    return this.http.put<any>(`${this.serverURL}/${collection}/${documentId}`, updatedObject).pipe(
      catchError(err => Observable.throw(err))
    );
  }

  /**
   * Gets equipments assigned to a staff
   *
   * @param staff The staff whose equipments are to be returned
   * @return An array of equipments assigned to the staff
   */
  getEquipmentsByStaff(staff: Staff): Observable<Array<Equipment>> {
    return this.http.get<Array<any>>(`${this.serverURL}/equipments`).pipe(
      map(equipments => {
        let result: Array<any> = [];
        for (let equipment of equipments) {
          if (JSON.stringify(equipment.staff) == JSON.stringify(staff)) {
            result.push(equipment);
          }
        }
        return result;
      }),
      catchError(err => Observable.throw(err))
    );
  }

}
