import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../models/user.register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loginUrl = 'http://localhost:9000/api/users/login';
  private urlAddUser = 'http://localhost:9000/api/users/add';
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(this.loginUrl, {
      username: username,
      password: password,
    });
  }

  addUser(userObject: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(this.urlAddUser, userObject);
  }
}
