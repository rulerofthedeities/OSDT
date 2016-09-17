export class Donation {
    public rates: Object;
    public values: Object;

  constructor(
    public currency: string,
    public amount: number,
    public paymentType: string,
    public dtPaid: Date,
    public note: string,
    public _id?: string
  ) {}
}
