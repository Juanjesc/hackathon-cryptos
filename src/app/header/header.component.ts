import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../private/services/user-info.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from '../private/models/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string | null = '';
  isLoggin: boolean = false;
  servicio: UserInfoService = new UserInfoService(this.http);
  userInfo: UserInfo = { username: '', deposit: 0 };
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}
  getInfoUserHeader() {
    let userInfoString = sessionStorage.getItem('user_info');
    if (userInfoString !== null){
      this.userInfo = JSON.parse(userInfoString) as UserInfo
      return this.userInfo
    }
    else{
      return null
    }
  }
  getDepositUser() {
    
  }
  logueado(): boolean {
    if (!!sessionStorage.getItem('username')) {
      this.isLoggin = true;
    }
    return this.isLoggin;
  }
  toLogin() {
    this.router.navigate(['/']);
  }
  clearSesionStorage() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id_usuario');
    sessionStorage.removeItem('user_info')
    this.isLoggin = false;
    this.router.navigate(['/']);
  }
}
