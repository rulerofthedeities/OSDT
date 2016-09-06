import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Donation} from '../models/donation.model';
import {Recipient} from '../models/recipient.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {FieldsService} from '../services/fields.service';
import {Field} from '../models/fields/field.model';

@Component({
  selector: 'donation',
  template: `
  NEW DONATION
  <form 
    [formGroup]="donationForm" 
    class="form-horizontal" 
    (submit)="submitForm(donationForm.value)">

    <pre>{{donation|json}}</pre>

    <div class="form-group">
      <auto-field 
        [field]="donationFields['paymentType']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFields['amount']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFields['currency']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFields['note']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>


    <button 
      type="submit"
      [disabled]="!donationForm.valid" 
      class="btn btn-primary col-xs-offset-2">
      {{donation._id ? "Update donation" : "Save donation"}}
    </button>


  </form>


  `
})

export class EditDonation implements OnInit {
  @Input() donation: Donation;
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  donationFields: {[fieldname: string]:Field<any>;} = {};
  donationForm: FormGroup;

  constructor (
    private donationService: DonationService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.donationForm = this.formBuilder.group({
      'paymentType': [this.donation.paymentType, Validators.required],
      'amount': [this.donation.amount, Validators.required],
      'note': [this.donation.amount],
      'currency': [this.donation.amount, Validators.required]
    });

    this.donationFields = this.fieldsService.getDonationFields();

  }

  submitForm(donation: Donation) {
    if (this.donation._id) {
      //Update donation
      console.log('Updating donation', donation);
      donation._id = this.donation._id;

      this.donationService.updateDonation(donation)
        .subscribe(
            data => {console.log('Updated donation', data);},
            error => this.errorService.handleError(error)
        );
    } else {
      //Save donation
      console.log('Saving donation', donation);
      donation.dtPaid = new Date();
      this.donationService.addDonation(donation, this.recipient._id)
        .subscribe(
            data => {console.log('Added donation', data);},
            error => this.errorService.handleError(error)
        );
    }
  }

}
