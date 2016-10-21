import {Reminder} from './reminder.model';
import {Donation} from './donation.model';

export class Recipient {
  public reminder: Reminder[];
  public donations: Donation[];
  public cnt: number;
  public total: number;

  constructor(
    public userId: string,
    public name: string,
    public description: string,
    public categories: string[],
    public url: string,
    public isActive = true,
    public _id?: string
  ) {}
}
