import {CurrencyModel} from './currency.model';

export class UserModel {

  constructor(
      public email: string,
      public password: string,
      public confirmPassword?: string,
      public userName?: string,
      public defaultCurrency?: CurrencyModel
  ) {}
}
