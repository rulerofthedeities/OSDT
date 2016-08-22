import {ReminderModel} from './reminder.model';
import {DonationModel} from './donation.model';

export class RecipientModel {
  public description: string;
  public categories: string[];
  public reminder: ReminderModel[];
  public donations: DonationModel[];

  constructor(
    public userId: string,
    public name: string
  ) {}
}
