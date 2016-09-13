import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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
    <alert type="info">
      <button *ngIf="!editMode"
        class="btn btn-primary" 
        type="button"
        (click)="toggleEditMode()">
        <span class="fa fa-pencil"></span>
        Edit Mode
      </button>
    </alert>

    <!-- Donation Form -->

    <h3 class="col-xs-offset-2">
      {{isNew ? "New donation" : "Donation"}} for {{currentRecipient?.name}}
    </h3>
    
    <div class="doc" *ngIf="editMode && currentRecipient">
      <form 
        [formGroup]="donationForm" 
        class="form-horizontal">

        <div class="form-group">
          <auto-field 
            [field]="donationFieldsAssoc['paymentType']"
            [data]="donation"
            [form]="donationForm">
          </auto-field>
        </div>

        <div class="form-group">
          <label 
            for="amount"
            class="control-label col-xs-2">
            {{donationFieldsAssoc['amount'].label}}
          </label>
          <div class="col-xs-5">
            <input 
              class="form-control"
              [placeholder]="donationFieldsAssoc['amount'].placeholder"
              formControlName="amount"
              [id]="amount"
              type="number">
          </div>
          <div class="col-xs-5">
            <select 
              class="form-control"
              formControlName="currency">
              <option 
                *ngFor="let opt of donationFieldsAssoc['currency'].options" 
                [value]="opt.key">
                {{opt.display}}
              </option>
            </select>
          </div>
           <div class="col-xs-offset-2">
            <field-messages 
              [control]="donationForm.controls.amount"
              [label]="donationFieldsAssoc['amount'].label">
            </field-messages>
          </div>
        </div>

        <div class="form-group">
          <auto-field 
            [field]="donationFieldsAssoc['note']"
            [data]="donation"
            [form]="donationForm">
          </auto-field>
        </div>
      </form>
      <div class="form-horizontal">
        <div class="form-group">
          <label 
            for="dtPaid"
            class="control-label col-xs-2">
            {{donationFieldsAssoc['dtPaid'].label}}
          </label>
          <div class="col-xs-10">
            <km-datepicker 
              [dateModel]="donation.dtPaid"
              (dateModelChange)="onDateChanged($event)">
            </km-datepicker>
          </div>
        </div>
      </div>

      <button 
        type="button"
        (click)="submitForm(donationForm.value, 'docDonation')"
        [disabled]="!donationForm.valid" 
        class="btn btn-success col-xs-offset-2">
        <span class="fa fa-check"></span>
        Save
      </button>

      <button 
        type="button"
        (click)="submitForm(donationForm.value, subView ? 'viewRecipient' : 'viewDonation')"
        [disabled]="!donationForm.valid" 
        class="btn btn-success">
        <span class="fa fa-check"></span>
        Save & Close
      </button>

      <button
        class="btn btn-warning" 
        type="button"
        (click)="close()">
        <span class="fa fa-times"></span>
        Cancel
      </button>
    </div>

    <div *ngIf="!editMode">
      <div class="doc">
        <auto-form-read
          [fields]="donationFieldsOrder"
          [data]="donation"
          >
        </auto-form-read>
      </div>

      <button
        class="btn btn-warning" 
        type="button"
        (click)="close()">
        <span class="fa fa-times"></span>
        Close
      </button>
    </div>

    Closure will lead to: {{prevNavState}}
  `,
  styles:[`
    .fa {font-size: 1.2em;}
    .doc {
      border:1px solid Gainsboro;
      border-radius:5px;
      background-color: #eff5f5;
      padding:6px;
      margin-bottom:12px;
    }`],
  styleUrls:[`client/components/form.css`]
})

export class EditDonation implements OnInit {
  @Input() donation: Donation;
  @Input() recipientId: string;
  @Input() editMode: boolean;
  @Input() subView: boolean;
  donationFieldsAssoc: {[fieldname: string]:Field<any>;} = {};
  donationFieldsOrder: Field<any>[];
  donationForm: FormGroup;
  currentRecipient: Recipient;
  prevNavState: string;
  isNew = false;

  constructor (
    private donationService: DonationService,
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.prevNavState = this.subView ? 'viewRecipient' : 'viewDonation';

    this.donationService.closeToDoc.subscribe(
      closedDonation => {
        this.donation = closedDonation ? closedDonation : this.donation;
        this.toggleEditMode();
      }
    );

    if (!this.recipientId) {
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
      'note': [this.donation.note],
      'currency': [this.donation.currency, Validators.required],
      'dtPaid': [this.isNew ? new Date() : this.donation.dtPaid, Validators.required]
    });
  }

  getRecipient(recipientId: string) {
    this.recipientService.getRecipient(recipientId).subscribe(
      recipient => {this.currentRecipient = recipient;},
      error => this.errorService.handleError(error)
    );
  }

  submitForm(donation: Donation, target: string) {
    if (this.donation._id) {
      //Update donation
      donation._id = this.donation._id;
      this.donationService.updateDonation(donation)
        .subscribe(
            donation => {this.close(donation, target);},
            error => this.errorService.handleError(error)
        );
    } else {
      //Add donation
      this.donationService.addDonation(donation, this.recipientId)
        .subscribe(
            donation => {this.close(donation, target);},
            error => this.errorService.handleError(error)
        );
    }
  }

  onDateChanged(newdt: Date) {
    this.donationForm.patchValue({dtPaid: newdt});
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.prevNavState = this.editMode ? 'docDonation' : (this.subView ? 'viewRecipient' : 'viewDonation');
  }

  close(donation?: Donation, target?: string) {
    let targetPage = target || this.prevNavState;
    if (this.subView && targetPage === 'viewRecipient') {
      this.router.navigate(['/recipients/donations/' + this.recipientId]);
    } else {
      this.donationService.closeDonation(targetPage, donation || this.donation);
    }
  }
}
