import {Reminder} from './reminder.model';
import {Donation} from './donation.model';

export class Recipient {
  public description: string;
  public categories: string[];
  public reminder: Reminder[];
  public donations: Donation[];
  public isActive = true;

  constructor(
    public userId: string,
    public name: string,
    public _id?: string
  ) {}
}
