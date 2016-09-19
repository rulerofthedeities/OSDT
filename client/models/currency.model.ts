export class Currency {
  constructor(
    public _id: string,
    public name: string,
    public code: string,
    public symbol?: string
  ) {}
}
