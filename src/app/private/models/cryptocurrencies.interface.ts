export interface CryptoData {
  cryptoicon?: number;
  cryptoname?: string;
  cryptoasset?: string;
  cryptovalue?: number;
  cryptostock?: number;
  cryptoId:string;
}

export interface CryptoUser {
  amount: number;
  userId?: string;
  cryptoId?: string;
}
