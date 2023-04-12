import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserRegister } from '../../models/user.register.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usernameInput: string = '';
  passwordInput: string = '';
  datos: any = [];
  user: UserRegister;
  
  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthServiceService
  ) {}
  openDialog() {
    let dialogRef
    if(screen.width < 500){
      dialogRef = this.dialog.open(RegisterComponent, {
        width:'95vw',
        maxWidth:'95vw',
        height: '90%',
 
      });
    }
    else{
      dialogRef = this.dialog.open(RegisterComponent, {
        width: '70%',
        maxWidth: '70%',
        disableClose: true
      });
    }
  }
  loguearse() {
    const usuarioName = this.usernameInput;
    this.authService.login(this.usernameInput, this.passwordInput).subscribe(
      (respuesta) => {
        console.log(respuesta);
        const userIdFront = respuesta;
        if (respuesta !== null) {
          sessionStorage.setItem('username', usuarioName);
          sessionStorage.setItem('id_usuario', respuesta)
          this.router.navigate(['/home']);
        } else {
          this._snackBar.open('Ha ocurrido un error, usuario incorrecto ❗', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }
      },
      (error) => {
        console.log(error);
        this._snackBar.open(
          '❗ El backend no está corriendo, error de servidor ❗',
          'Cerrar',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        );
      }
    );
  }

  ngOnInit(): void {}
  onSubmit(e: Event) {
    e.preventDefault();
    this.loguearse();
    document.forms[0].reset();
  }
}
