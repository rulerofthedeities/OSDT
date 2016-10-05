import {Currency} from './currency.model';

export class User {
  constructor(
      public email: string,
      public password: string,
      public confirmPassword?: string,
      public userName?: string,
      public defaultCurrency?: Currency
  ) {}
}

export type UserLocal = {
  token: string;
  userId: string;
  userName: string;
}

export type UserAccess =  {
  level: number;
  roles: string[];
}
