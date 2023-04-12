import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserRegister } from '../../models/user.register.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showSpinner: boolean = false;
  minYear: string;
  servicioAuth: AuthServiceService = new AuthServiceService(this.http);
  constructor(
    private http: HttpClient,
    private dialogref: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    let currentDate = new Date();
    let minDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this.minYear = minDate.toISOString().slice(0, 10);
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ]),
        ],
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(75),
            Validators.minLength(3),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
            ),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^(?=.*[A-Z])(?=.*[a-z]).{6,}$'),
          ]),
        ],
        confirmpassword: ['', Validators.required],
        deposit: ['', Validators.required],
        birthdate: [
          '',
          Validators.compose([
            Validators.required,
            Validators.max(parseInt(this.minYear.slice(0, 4))),
          ]),
        ],
      },
      {
        validators: this.MustMatch('password', 'confirmpassword'),
      }
    );
  }

  ngOnInit(): void {}
  onSubmit(e: Event) {
    e.preventDefault();
    if (this.registerForm.valid) {
      try {
        this.showSpinner = true;
        let userId = uuidv4();
        const usuario: UserRegister = {
          userId: userId,
          username: this.registerForm.get('username')?.value,
          fullname: this.registerForm.get('fullname')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          birthdate: this.registerForm.get('birthdate')?.value,
          deposit: this.registerForm.get('deposit')?.value,
        };
        this.servicioAuth.addUser(usuario).subscribe(
          (result) => {
            console.log('holap');
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
        setTimeout(() => {
          this.showSpinner = false;
          this.closeModal();
          this._snackBar.open(
            '*El registro de usuario se ha completado con éxito ✅',
            'Cerrar',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            }
          );
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    } //cierre de if this.form.isvalid
    else {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this._snackBar.open(
          '*El registro de usuario ha fallado ❌, campos incorrectos o incompletos.',
          'Cerrar',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        );
      }, 3000);
    }
  }
  MustMatch(password: string, confirmpassword: string) {
    return (formgroup: FormGroup) => {
      const passwordValue = formgroup.controls[password];
      const confirmpasswordValue = formgroup.controls[confirmpassword];
      if (
        confirmpasswordValue.errors &&
        !confirmpasswordValue.errors.MustMatch
      ) {
        return;
      }
      if (passwordValue.value !== confirmpasswordValue.value) {
        confirmpasswordValue.setErrors({ MustMatch: true });
      } else {
        confirmpasswordValue.setErrors(null);
      }
    };
  }

  closeModal() {
    this.dialogref.close();
    this.registerForm.reset();
  }
}
