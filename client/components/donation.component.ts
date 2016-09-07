import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Donation} from '../models/donation.model';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {FieldsService} from '../services/fields.service';

@Component({
  selector: 'donation',
  template: `
  <button *ngIf="!editMode"
    class="btn btn-primary" 
    type="button"
    (click)="toggleEditMode()">
    Edit Mode
  </button>

  <form *ngIf="editMode"
    [formGroup]="donationForm" 
    class="form-horizontal" 
    (submit)="submitForm(donationForm.value)">

    <div class="form-group">
      <auto-field 
        [field]="donationFieldsAssoc['paymentType']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFieldsAssoc['amount']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFieldsAssoc['currency']"
        [data]="donation"
        [form]="donationForm">
      </auto-field>
    </div>

    <div class="form-group">
      <auto-field 
        [field]="donationFieldsAssoc['note']"
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

    <button
      class="btn btn-primary" 
      type="button"
      (click)="toggleEditMode()">
      Cancel
    </button>
  </form>
  
  <div *ngIf="!editMode">
    <auto-form-read
      [fields]="donationFieldsOrder"
      [data]="donation"
      >
    </auto-form-read>
  </div>
  `
})

export class EditDonation implements OnInit {
  @Input() donation: Donation;
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  donationFieldsAssoc: {[fieldname: string]:Field<any>;} = {};
  donationFieldsOrder: Field<any>[];
  donationForm: FormGroup;

  constructor (
    private donationService: DonationService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    let fields = this.fieldsService.getFields('donation');
    this.donationFieldsAssoc = fields.assoc;
    this.donationFieldsOrder = fields.ordered;
  }

  buildForm() {
    this.donationForm = this.formBuilder.group({
      'paymentType': [this.donation.paymentType, Validators.required],
      'amount': [this.donation.amount, Validators.required],
      'note': [this.donation.amount],
      'currency': [this.donation.amount, Validators.required]
    });
  }

  submitForm(donation: Donation) {
    if (this.donation._id) {
      //Update donation
      donation._id = this.donation._id;
      this.donationService.updateDonation(donation)
        .subscribe(
            data => {console.log('Updated donation', data);},
            error => this.errorService.handleError(error)
        );
    } else {
      //Save donation
      donation.dtPaid = new Date();
      this.donationService.addDonation(donation, this.recipient._id)
        .subscribe(
            data => {console.log('Added donation', data);},
            error => this.errorService.handleError(error)
        );
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
