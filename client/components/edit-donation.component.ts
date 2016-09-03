import {Component, OnInit} from '@angular/core';
import {Donation} from '../models/donation.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {FieldControlService} from '../services/field-control.service';
import {FieldsService} from '../services/fields.service';
import {Field} from '../models/fields/field.model';

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
    private fieldControlService: FieldControlService,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
    this.fields = this.fieldsService.getDonationFields();
    this.fieldControlService.dataSubmitted.subscribe(
      formData => {this.submitForm(formData);}
    );
  }

  submitForm(donation: Donation) {
    donation.dtPaid = new Date();
    donation.recipientId = '57bb3aa95b315169c0c5cb49';

    this.donationService.addDonation(donation)
      .subscribe(
          data => {console.log('added donation', data);},
          error => this.errorService.handleError(error)
      );
  }
}
