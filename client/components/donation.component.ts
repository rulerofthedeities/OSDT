import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Donation} from '../models/donation.model';
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
    class="btn btn-primary">
    Save
  </button>

  </form>


  `
})

export class EditDonation implements OnInit {
  @Input() donation: Donation;
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

    console.log('submit donation',donation);
    donation._id = this.donation._id;
    //donation.dtPaid = new Date();

    this.donationService.updateDonation(donation)
      .subscribe(
          data => {console.log('updated donation', data);},
          error => this.errorService.handleError(error)
      );
    /*
    this.donationService.addDonation(donation)
      .subscribe(
          data => {console.log('added donation', data);},
          error => this.errorService.handleError(error)
      );
    */
  }

}
