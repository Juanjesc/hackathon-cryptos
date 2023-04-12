import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private urlGetUserById = `http://localhost:9000/api/users/get/${sessionStorage.getItem(
    'id_usuario'
  )}`;
  private urlGetUserInfoHeaderById = `http://localhost:9000/api/users/get/infoUser/${sessionStorage.getItem(
    'id_usuario'
  )}`;
  private urlUpdateUserDeposit = `http://localhost:9000/api/users/update/deposit`;
  constructor(private http: HttpClient) {}

  getUserById(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.urlGetUserById);
  }
  getUserInfoHeaderById(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.urlGetUserInfoHeaderById);
  }
  updateUserDeposit(user: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.urlUpdateUserDeposit, {userId: user.userId, deposit: user.deposit});
  }
}
