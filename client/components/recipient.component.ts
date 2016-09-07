import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {FieldsService} from '../services/fields.service';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector:'recipient',
  template: `
    <button *ngIf="!editMode"
      class="btn btn-primary" 
      type="button"
      (click)="toggleEditMode()">
      Edit Mode
    </button>

    <form *ngIf="editMode"
      [formGroup]="recipientForm" 
      class="form-horizontal" 
      (submit)="submitForm(recipientForm.value)">

      <div class="form-group">
        <auto-field 
          [field]="recipientFieldsAssoc['name']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFieldsAssoc['description']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFieldsAssoc['categories']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFieldsAssoc['isActive']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <button 
        type="submit"
        [disabled]="!recipientForm.valid" 
        class="btn btn-primary col-xs-offset-2">
        {{recipient._id ? "Update recipient" : "Save recipient"}}
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
        [fields]="recipientFieldsOrder"
        [data]="recipient"
        >
      </auto-form-read>
    </div>
  `
})

export class EditRecipient implements OnInit {
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  recipientFieldsAssoc: {[fieldname: string]:Field<any>;} = {};
  recipientFieldsOrder: Field<any>[];
  recipientForm: FormGroup;

  constructor (
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.retrieveRecipient();
    this.buildForm();
    let fields = this.fieldsService.getFields('recipient');
    this.recipientFieldsAssoc = fields.assoc;
    this.recipientFieldsOrder = fields.ordered;
  }

  buildForm() {
    this.recipientForm = this.formBuilder.group({
      'name': [this.recipient.name, Validators.required],
      'description': [this.recipient.description],
      'categories': [this.recipient.categories],
      'isActive': [this.recipient.isActive]
    });
  }

  retrieveRecipient() {
    if (this.recipient._id) {
      //Retrieve all data in case of an existing recipient
      //Note: Input() recipient doesn't contain all data
      this.recipientService.getRecipient(this.recipient._id).subscribe(
        recipient => {
          this.recipient = recipient;
        },
        error => this.errorService.handleError(error)
      );
    }
  }

  submitForm(recipient: Recipient) {
    if (this.recipient._id) {
      //Update recipient
      recipient._id = this.recipient._id;
      recipient.categories = this.formatCategories(recipient.categories);
      this.recipientService.updateRecipient(recipient).subscribe(
        update => {console.log('update', update);},
        error => this.errorService.handleError(error)
      );
    } else {
      //Add recipient
      recipient.userId = this.recipient.userId;
      recipient.categories = this.formatCategories(recipient.categories);
      console.log(recipient.categories);
      this.recipientService.addRecipient(recipient).subscribe(
        recipient => {console.log('added recipient', recipient);},
        error => this.errorService.handleError(error)
      );
    }
  }

  formatCategories(cats: any): string[] {
    let categories: string[];

    categories = cats.toString().split(',');
    return categories.map(category => category.trim());
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
