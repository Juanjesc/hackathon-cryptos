import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { BuyDialogComponent } from '../../components/buy-dialog/buy-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SellDialogComponent } from '../../components/sell-dialog/sell-dialog.component';
import { UserInfo } from '../../models/usuario.interface';
import { UserInfoService } from '../../services/user-info.service';
import { CryptoData } from '../../models/cryptocurrencies.interface';
import { TableInfoService } from '../../services/table-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'cryptoicon',
    'cryptoname',
    'cryptoasset',
    'cryptovalue',
    'cryptostock',
    'cryptoactions',
  ];
  dataSource: MatTableDataSource<CryptoData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  username: string = ''; //este username será el que se guarda en session storage
  user_id: string;
  cryptomonedas: CryptoData[] = [];
  userInfo: UserInfo;
  servicioUser: UserInfoService = new UserInfoService(this.http)
  servicioTable: TableInfoService = new TableInfoService(this.http)

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<CryptoData>([]);
    //Las siguientes dos líneas en el constructor es para resolver errores de TS de los @viewChild
    this.sort = {} as MatSort;
    this.paginator = {} as MatPaginator;

    if (!this.logueado()) {
      router.navigate(['/']);
    }
  }
  logueado() {
    var logueado = false;
    if (sessionStorage.getItem('username')) {
      logueado = true;
    }
    return logueado;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') ?? ''; //esto lo que hace es que si sessionStorage es null ponga por defecto ''
    this.user_id = sessionStorage.getItem('id_usuario') ?? '';
    
    this.servicioUser.getUserInfoHeaderById().subscribe((result)=> {
      this.userInfo = result;
      let userInfoToString = JSON.stringify(this.userInfo)
      sessionStorage.setItem('user_info', userInfoToString)
      console.log(this.userInfo)
    })


    this.drawTable();
  }
  drawTable() {
    this.servicioTable.getAllCryptocurrencies().subscribe((result)=> {
      this.dataSource.data = result
      console.log(this.dataSource.data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialogBuy(row: any) {
    let cryptoData: CryptoData = {
      cryptoicon: row.cryptoicon,
      cryptoname: row.cryptoname,
      cryptoasset: row.cryptoasset,
      cryptovalue: row.cryptovalue,
      cryptostock: row.cryptostock,
      cryptoId: row.cryptoId
    };
    let dialogRef;
    if (screen.width < 500) {
      dialogRef = this.dialog.open(BuyDialogComponent, {
        width: '95vw',
        maxWidth: '95vw',
        height: 'max-content',
        data: cryptoData
      });
    } else {
      dialogRef = this.dialog.open(BuyDialogComponent, {
        width: 'max-content',
        data: cryptoData
      });
    }
    console.log(cryptoData)
  }
  openDialogSell(row: any) {
    let cryptoData: CryptoData = {
      cryptoicon: row.cryptoicon,
      cryptoname: row.cryptoname,
      cryptoasset: row.cryptoasset,
      cryptovalue: row.cryptovalue,
      cryptostock: row.cryptostock,
      cryptoId: row.cryptoId
    };
    let dialogRef;
    if (screen.width < 500) {
      dialogRef = this.dialog.open(SellDialogComponent, {
        width: '95vw',
        maxWidth: '95vw',
        height: 'max-content',
        data: cryptoData
      });
    } else {
      dialogRef = this.dialog.open(SellDialogComponent, {
        width: 'max-content',
        maxWidth: '70%',
        data: cryptoData
      });
    }
  }
}
