export class Donation {
  constructor(
    public currency: string,
    public amount: number,
    public paymentType: string,
    public dtPaid: Date,
    public note: string,
    public _id?: string
  ) {}
}
