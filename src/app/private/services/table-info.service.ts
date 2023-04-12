import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CryptoData, CryptoUser } from '../models/cryptocurrencies.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TableInfoService {
  private urlGetAllCryptocurrencies =
    'http://localhost:9000/api/cryptomonedas/all';
  private urlUpdateAmount = 'http://localhost:9000/api/cryptouser/update';
  private urlGetIdCryptoByAsset = 'http://localhost:9000/api/cryptomonedas/get';
  private urlGetCryptoUserByIdAndCryptoId = `http://localhost:9000/api/cryptouser/get`;
  private urlUpdateStock = 'http://localhost:9000/api/cryptomonedas/update/stock';
  constructor(private http: HttpClient) {}

  getAllCryptocurrencies(): Observable<CryptoData[]> {
    return this.http.get<CryptoData[]>(this.urlGetAllCryptocurrencies);
  }
  updateAmount(cryptouser: CryptoUser): Observable<CryptoUser> {
    return this.http.post<CryptoUser>(this.urlUpdateAmount, {
      amount: cryptouser.amount,
      userId: cryptouser.userId,
      cryptoId: cryptouser.cryptoId,
    });
  }
  getIdCryptoByAsset(asset: string): Observable<string> {
    return this.http.get<string>(`${this.urlGetIdCryptoByAsset}/${asset}`);
  }
  getCryptoUserByIdUserAndCryptoId(
    userId: string,
    cryptoId: string
  ): Observable<CryptoUser> {
    return this.http.get<CryptoUser>(
      `${this.urlGetCryptoUserByIdAndCryptoId}/${userId}/${cryptoId}`
    );
  }

  updateStock(cryptocurrencie: CryptoData): Observable<CryptoData> {
    return this.http.post<CryptoData>(this.urlUpdateStock, {cryptostock: cryptocurrencie.cryptostock, cryptoId: cryptocurrencie.cryptoId});
  }
}
