import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Donation} from '../models/donation.model';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {DonationService} from '../services/donation.service';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {FieldsService} from '../services/fields.service';

@Component({
  selector: 'donation',
  template: `
    <button *ngIf="!editMode"
      class="btn btn-primary" 
      type="button"
      (click)="toggleEditMode()">
      <span class="fa fa-pencil"></span>
      Edit Mode
    </button>

  <!-- Select Recipient if none available -->
  <form *ngIf="editMode && !recipientId" >
    <label 
      [attr.for]="recipient"
      class="control-label col-xs-2">
      Select a recipient
    </label>

    <select 
      class="form-control"
      [id]="recipient" 
      (change)="recipientSelected(recipient.value)" #recipient>
      <option 
        *ngFor="let rec of recipients" 
        [value]="rec._id">
        {{rec.name}}
      </option>
    </select>
  </form>

  <!-- Donation Form -->

  <h3 class="col-xs-offset-2">
    {{isNew ? "New donation" : "Donation"}} for {{currentRecipient?.name}}
  </h3>

  <form *ngIf="editMode && recipientId"
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
      class="btn btn-success col-xs-offset-2">
      <span class="fa fa-check"></span>
      {{donation._id ? "Update donation" : "Save donation"}}
    </button>

    <button
      class="btn btn-warning" 
      type="button"
      (click)="toggleEditMode()">
      <span class="fa fa-times"></span>
      Cancel
    </button>
  </form>
  
  <div *ngIf="!editMode">
    <auto-form-read
      [fields]="donationFieldsOrder"
      [data]="donation"
      >
    </auto-form-read>

    <button
      class="btn btn-warning" 
      type="button"
      (click)="close()">
      <span class="fa fa-times"></span>
      Close
    </button>
  </div>
  `,
  styles:[`.fa {font-size: 1.2em;}`]
})

export class EditDonation implements OnInit {
  @Input() donation: Donation;
  @Input() recipientId: string;
  @Input() editMode: boolean;
  donationFieldsAssoc: {[fieldname: string]:Field<any>;} = {};
  donationFieldsOrder: Field<any>[];
  donationForm: FormGroup;
  recipients: Recipient[]; //if new donation and no recipient selected
  currentRecipient: Recipient;
  isNew = false;

  constructor (
    private donationService: DonationService,
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.recipientId) {
      //if new donation and no recipient selected, show dropbox with recipient list
      this.getRecipients();
      this.isNew = this.editMode;
    } else {
      //get current recipient data
      this.getRecipient(this.recipientId);
      this.isNew = !this.donation._id;
    }
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

  getRecipients() {
    this.recipientService.getRecipients().subscribe(
      recipients => {this.recipients = recipients;},
      error => this.errorService.handleError(error)
    );
  }

  getRecipient(recipientId: string) {
    this.recipientService.getRecipient(recipientId).subscribe(
      recipient => {this.currentRecipient = recipient;},
      error => this.errorService.handleError(error)
    );
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
      this.donationService.addDonation(donation, this.recipientId)
        .subscribe(
            data => {console.log('Added donation', data);},
            error => this.errorService.handleError(error)
        );
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  close() {
    this.donationService.closeDonation();
  }

  recipientSelected(recipientId: string) {
    console.log('recipient Selected', recipientId);
    this.recipientId = recipientId;
  }

}
