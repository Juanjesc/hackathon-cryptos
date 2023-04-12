import { CryptoData } from './../../models/cryptocurrencies.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from '../../services/user-info.service';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TableInfoService } from '../../services/table-info.service';
import { CryptoUser } from '../../models/cryptocurrencies.interface';
import { UserInfo } from '../../models/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss'],
})
export class BuyDialogComponent implements OnInit {
  buyForm: FormGroup;
  servicioUser: UserInfoService = new UserInfoService(this.http)
  servicioTable: TableInfoService = new TableInfoService(this.http)
  depositUser: number;
  userId: string;
  cryptoId: string;
  cryptoUser: CryptoUser = {amount: 0}
  showSpinner: boolean = false;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.buyForm = this.formBuilder.group({
      buy: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(/^[0-9]+([,.][0-9]+)?$/),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.servicioUser.getUserInfoHeaderById().subscribe((result) =>{
      this.depositUser = result.deposit;
    })
    this.cryptoId = this.data.cryptoId
    this.userId = sessionStorage.getItem('id_usuario') ?? ''
    this.servicioTable.getCryptoUserByIdUserAndCryptoId(this.userId, this.cryptoId).subscribe((result) => {
      this.cryptoUser = result;
    })


  }

  buyAmount(e: Event){
    e.preventDefault()
    if(this.buyForm.valid){

      var amountInput: number = parseFloat(this.buyForm.get('buy')?.value) 
      var amountUpdated: number;
      console.log(amountInput)
      if (!!this.cryptoUser){
        amountUpdated = parseFloat(amountInput.toString()) + parseFloat(this.cryptoUser.amount.toString()) 
      }
      else{
        amountUpdated = parseFloat(amountInput.toString()) + 0;
      }
      if(this.updateDeposit() <= 0 || this.updateStock() <= 0){
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.closeDialog();
          this._snackBar.open(
            `Compra rechazada ❌, dispones de ${this.depositUser}€ y has querido comprar ${amountInput} ${this.data.cryptoasset} que tienen un coste superior a tu depósito, o también puede deberse a que no hay stock disponible para tu compra, la compra no es válida`,
            'Cerrar',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 10000,
            }
          );
        }, 3000);
      }
      else{
        this.updateStock()
        let cryptouser: CryptoUser = {
          amount: +amountUpdated.toFixed(4),
          userId: this.userId,
          cryptoId: this.cryptoId
        }
        let userUpdated: UserInfo = {
          userId: this.userId,
          deposit: this.updateDeposit()
        }
        let cryptostock: CryptoData = {
          cryptostock: this.updateStock(),
          cryptoId: this.data.cryptoId
        }
        this.servicioTable.updateStock(cryptostock).subscribe((result)=>{
          console.log(result)
        })
        this.servicioTable.updateAmount(cryptouser).subscribe((result)=>{
          console.log(result)
        })
        this.servicioUser.updateUserDeposit(userUpdated).subscribe((result)=>{
          console.log(result)
        })
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.closeDialog();
          this._snackBar.open(
            `Compra aceptada ✅ ahora tu total de ${
              this.data.cryptoasset
            } es de ${+amountUpdated.toFixed(4)} ${this.data.cryptoasset}, tu depósito ahora es de ${this.updateDeposit()} €`,
            'Cerrar',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 10000,
            }
          );
        }, 3000);
      }
    }

  }
  updateDeposit(): number{
    let currencie: number = this.data.cryptovalue;
    let buyInput: number = parseFloat(this.buyForm.get('buy')?.value.toString());
    let totalPayed: number = parseFloat(currencie.toString()) * parseFloat(buyInput.toString());
    let depositUpdated: number = parseFloat(this.depositUser.toString()) - parseFloat(totalPayed.toString());
    console.log('has gastado: ' + totalPayed + ' €' + ' y te queda un depósito total de: ' + depositUpdated)
    return +depositUpdated.toFixed(4)
  }
  updateStock(): number{
    let currentStock: number = this.data.cryptostock
    let buyInput: number = parseFloat(this.buyForm.get('buy')?.value.toString());
    let stockUpdated: number = parseFloat(currentStock.toString()) - parseFloat(buyInput.toString())
    console.log(
      'has comprado: ' +
        buyInput +
        ' cryptos' +
        ' y te queda un stock total de: ' +
       stockUpdated
    );
    return +stockUpdated.toFixed(4)
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
