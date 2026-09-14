import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user.model';
import { AppSettings } from '../AppSettings';

const AUTH_API = AppSettings.API_ENDPOINT + 'auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedUser: any;
  constructor(private http: HttpClient) {}

  authentification(user: FormGroup): Observable<any> {
    return this.http.post(
      AUTH_API + 'authentication',
      {
        username: user.value.username,
        password: user.value.password,
      },
      httpOptions,
    );
  }

  register(user: FormGroup): Observable<any> {
    console.log(user.value.password);
    return this.http.post(
      AUTH_API + 'register',
      {
        email: user.value.email,
        username: user.value.username,
        password: user.value.password,
        role: user.value.role,
      },
      httpOptions,
    );
  }

  async setLoggedUser(data: any) {
    this._loggedUser = data;
    localStorage.setItem('loggedUser', JSON.stringify(this._loggedUser));
  }

  get loggedUser(): User | undefined {
    this._loggedUser = JSON.parse(<string>localStorage.getItem('loggedUser'));
    console.log(this._loggedUser);
    return this._loggedUser;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(AUTH_API + 'getAllUsers').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError(
            'Access Denied. Only an ADMINISTRATOR can view all users.',
          );
        }
        return throwError('Error retrieving users.');
      }),
    );
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${AUTH_API}deleteUser/${username}`, httpOptions);
  }
}
