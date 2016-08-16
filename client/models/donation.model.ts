import {CurrencyModel} from './currency.model';

export class DonationModel {
  constructor(
    public currency: CurrencyModel,
    public amount: number,
    public paymentType: string,
    public dt: Date,
    public note: string
  ) {}
}
