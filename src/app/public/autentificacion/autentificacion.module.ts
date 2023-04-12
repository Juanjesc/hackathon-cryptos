import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from 'src/app/private/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateModule } from 'src/app/private/private.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule,
    PrivateModule,
  ],
})
export class AutentificacionModule {}
