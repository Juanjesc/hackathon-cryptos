import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from '../../services/user-info.service';
import { HttpClient } from '@angular/common/http';
import { CryptoUser } from '../../models/cryptocurrencies.interface';
import { TableInfoService } from '../../services/table-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../../models/usuario.interface';
import { CryptoData } from '../../models/cryptocurrencies.interface';
@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.scss'],
})
export class SellDialogComponent implements OnInit {
  sellForm: FormGroup;
  servicioUser: UserInfoService = new UserInfoService(this.http);
  servicioTable: TableInfoService = new TableInfoService(this.http);
  depositUser: number;
  userId: string;
  cryptoId: string;
  cryptoUser: CryptoUser = { amount: 0 };
  showSpinner: boolean = false;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.sellForm = this.formBuilder.group({
      sell: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0.1),
          Validators.pattern(/^[0-9]+([,.][0-9]+)?$/),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.servicioUser.getUserInfoHeaderById().subscribe((result) => {
      this.depositUser = result.deposit;
    });
    this.cryptoId = this.data.cryptoId;
    this.userId = sessionStorage.getItem('id_usuario') ?? '';
    this.servicioTable
      .getCryptoUserByIdUserAndCryptoId(this.userId, this.cryptoId)
      .subscribe((result) => {
        this.cryptoUser = result;
      });
  }

  sellAmount(e: Event) {
    e.preventDefault();
    if (this.sellForm.valid) {
      let amountInput: number = parseFloat(this.sellForm.get('sell')?.value);
      let amountUpdated: number;
      console.log(amountInput);
      if (!!this.cryptoUser) {
        amountUpdated =
          parseFloat(this.cryptoUser.amount.toString()) -
          parseFloat(amountInput.toString());
      } else {
        amountUpdated = parseFloat(amountInput.toString()) - 0;
      }
      if (amountUpdated <= 0 || this.updateStock() <= 0) {
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.closeDialog();
          this._snackBar.open(
            `Venta rechazada ❌, dispones de ${this.cryptoUser.amount} ${this.data.cryptoasset} y has querido vender ${amountInput} ${this.data.cryptoasset}, la venta no es válida`,
            'Cerrar',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 10000,
            }
          );
        }, 3000);
      } else {
        let cryptouser: CryptoUser = {
          amount: +amountUpdated.toFixed(4),
          userId: this.userId,
          cryptoId: this.cryptoId,
        };
        let userUpdated: UserInfo = {
          userId: this.userId,
          deposit: this.updateDeposit(),
        };
        let cryptostock: CryptoData = {
          cryptostock: this.updateStock(),
          cryptoId: this.data.cryptoId,
        };
        this.servicioTable.updateStock(cryptostock).subscribe((result) => {
          console.log(result);
        });
        this.servicioTable.updateAmount(cryptouser).subscribe((result) => {
          console.log(result);
        });
        this.servicioUser.updateUserDeposit(userUpdated).subscribe((result) => {
          console.log(result);
        });
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.closeDialog();
          this._snackBar.open(
            `Venta aceptada ✅ ahora tu total de ${
              this.data.cryptoasset
            } es de ${+amountUpdated.toFixed(4)} ${
              this.data.cryptoasset
            }, y tu depósito ahora es de ${this.updateDeposit()}€`,
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
  updateDeposit(): number {
    let currencie: number = this.data.cryptovalue;
    let sellInput: number = parseFloat(
      this.sellForm.get('sell')?.value.toString()
    );
    let totalSold: number =
      parseFloat(currencie.toString()) * parseFloat(sellInput.toString());
    let depositUpdated: number =
      parseFloat(this.depositUser.toString()) +
      parseFloat(totalSold.toString());
    console.log(
      'has vendido: ' +
        totalSold +
        ' €' +
        ' y te queda un depósito total de: ' +
        depositUpdated
    );
    return +depositUpdated.toFixed(4);
  }
  updateStock(): number {
    let currentStock: number = this.data.cryptostock;
    let sellInput: number = parseFloat(
      this.sellForm.get('sell')?.value.toString()
    );
    let stockUpdated: number =
      parseFloat(currentStock.toString()) + parseFloat(sellInput.toString());
    console.log(
      'has vendido: ' +
        sellInput +
        ' cryptos' +
        ' y te queda un stock total de: ' +
        stockUpdated
    );
    return +stockUpdated.toFixed(4);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
