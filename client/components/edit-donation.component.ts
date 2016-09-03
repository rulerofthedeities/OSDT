import {Component, OnInit} from '@angular/core';
import {Donation} from '../models/donation.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {FieldsService} from '../services/fields.service';
import {Field} from '../models/field.model';

@Component({
  selector: 'donation',
  template: `
  NEW DONATION
  <auto-form [fields]="fields">
  </auto-form>
  `
})

export class EditDonation implements OnInit {
  fields: Field<any>[];

  constructor (
    private donationService: DonationService,
    private errorService: ErrorService,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
    this.fields = this.fieldsService.getDonationFields();
  }

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
