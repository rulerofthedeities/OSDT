import {Currency} from './currency.model';

export class Donation {
  constructor(
    public currency: Currency,
    public amount: number,
    public paymentType: string,
    public dt: Date,
    public note: string
  ) {}
}
