import {ReminderModel} from './reminder.model';
import {DonationModel} from './donation.model';

export class RecipientModel {
  constructor(
    public userId: string,
    public name: string,
    public description: string,
    public categories: string[],
    public donations: DonationModel[],
    public reminder: ReminderModel[]
  ) {}
}
