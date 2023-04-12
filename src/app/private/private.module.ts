import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyDialogComponent } from './components/buy-dialog/buy-dialog.component';
import { SellDialogComponent } from './components/sell-dialog/sell-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BuyDialogComponent,
    SellDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    BuyDialogComponent,
    SellDialogComponent
  ]
})
export class PrivateModule {}
