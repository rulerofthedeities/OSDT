import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {FieldsService} from '../services/fields.service';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector:'recipient',
  template: `RECIPIENT
    <form 
      [formGroup]="recipientForm" 
      class="form-horizontal" 
      (submit)="submitForm(recipientForm.value)">

      <pre>{{recipient|json}}</pre>

      <div class="form-group">
        <auto-field 
          [field]="recipientFields['name']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFields['description']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFields['categories']"
          [data]="recipient"
          [form]="recipientForm">
        </auto-field>
      </div>

      <div class="form-group">
        <auto-field 
          [field]="recipientFields['isActive']"
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
    </form>
  `
})

export class EditRecipient implements OnInit {
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  recipientFields: {[fieldname: string]:Field<any>;} = {};
  recipientForm: FormGroup;

  constructor (
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.recipient._id) {
      //Retrieve all data in case of an existing recipient
      this.recipientService.getRecipient(this.recipient._id).subscribe(
        recipient => {
          this.recipient = recipient;
        },
        error => this.errorService.handleError(error)
      );
    }
    this.buildForm();
    this.recipientFields = this.fieldsService.getFields('recipient').assoc;
  }

  buildForm() {
    this.recipientForm = this.formBuilder.group({
      'name': [this.recipient.name, Validators.required],
      'description': [this.recipient.description],
      'categories': [this.recipient.categories],
      'isActive': [this.recipient.isActive]
    });
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

}
