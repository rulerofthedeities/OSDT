export class Currency {
  public isDefault: boolean = false;
  constructor(
    public _id: string,
    public name: string,
    public code: string,
    public symbol?: string
  ) {}
}
