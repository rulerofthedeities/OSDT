import {Component} from '@angular/core';
import {Donation} from '../models/donation.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'donation',
  template: `
  NEW DONATION
  <form (ngSubmit)="onSubmit()">
    <button type="submit" class="btn btn-success">Save</button>
  </form>
  `
})

export class EditDonation {

  constructor (
    private donationService: DonationService,
    private errorService: ErrorService
  ) {}

  onSubmit() {
    console.log('test adding donation');
    const donation = new Donation('EUR', 20, 'credit card', new Date(), 'test2', '57bb3aa95b315169c0c5cb49');
    this.donationService.addDonation(donation)
      .subscribe(
          data => {console.log('added donation', data);},
          error => this.errorService.handleError(error)
      );
  }
}
