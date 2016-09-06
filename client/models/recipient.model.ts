import {Reminder} from './reminder.model';
import {Donation} from './donation.model';

export class Recipient {
  public _id: string;
  public reminder: Reminder[];
  public donations: Donation[];

  constructor(
    public userId: string,
    public name: string,
    public description: string,
    public categories: string[],
    public isActive = true
  ) {}
}
