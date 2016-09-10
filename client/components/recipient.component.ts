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
    <alert type="info">
      <button *ngIf="!editMode"
        class="btn btn-primary" 
        type="button"
        (click)="toggleEditMode()">
        <span class="fa fa-pencil"></span>
        Edit Mode
      </button>
    </alert>
    <div class="doc" *ngIf="editMode && recipientForm">
      <form
        [formGroup]="recipientForm" 
        class="form-horizontal">

        <auto-form 
          [fields]="recipientFieldsOrder"
          [data]="recipient"
          [form]="recipientForm">
        </auto-form>

        <button 
          type="click"
          (click)="submitForm(recipientForm.value, 'doc')"
          [disabled]="!recipientForm.valid" 
          class="btn btn-success col-xs-offset-2">
          <span class="fa fa-check"></span>
          Save
        </button>

        <button 
          type="submit"
          (click)="submitForm(recipientForm.value, 'view')"
          [disabled]="!recipientForm.valid" 
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
      </form>
    </div>
    
    <div *ngIf="!editMode">
      <div class="doc">
        <auto-form-read
          [fields]="recipientFieldsOrder"
          [data]="recipient"
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
    .doc {
      border:1px solid Gainsboro;
      border-radius:5px;
      background-color: #fffae6;
      padding:6px;
      margin-bottom:12px;
    }
  `]
})

export class EditRecipient implements OnInit {
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  @Input() prevNavState: string;
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
    this.recipientService.closeToDoc.subscribe(
      closedRecipient => {
        this.recipient = closedRecipient ? closedRecipient : this.recipient;
        this.toggleEditMode();
      }
    );
    if (this.recipient._id) {
      //read/edit existing doc
      this.retrieveRecipient();
    } else {
      //new doc
      this.buildForm();
    }
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
    //Retrieve all data in case of an existing recipient
    //Note: Input() recipient doesn't contain all data
    this.recipientService.getRecipient(this.recipient._id).subscribe(
      recipient => {
        this.recipient = recipient;
        this.buildForm();
      },
      error => this.errorService.handleError(error)
    );
  }

  submitForm(recipient: Recipient, target: string) {
    if (this.recipient._id) {
      //Update recipient
      recipient._id = this.recipient._id;
      recipient.categories = this.formatCategories(recipient.categories);
      this.recipientService.updateRecipient(recipient).subscribe(
        update => {
          this.recipient = recipient;
          this.recipientService.closeRecipient(target, recipient);
        },
        error => this.errorService.handleError(error)
      );
    } else {
      //Add recipient
      recipient.userId = this.recipient.userId;
      recipient.categories = this.formatCategories(recipient.categories);
      this.recipientService.addRecipient(recipient).subscribe(
        recipient => {
          this.recipient = recipient;
          this.recipientService.closeRecipient(target, recipient);
        },
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
    this.prevNavState = this.editMode ? 'doc' : 'view';
  }

  close() {
    this.recipientService.closeRecipient(this.prevNavState);
  }

}
