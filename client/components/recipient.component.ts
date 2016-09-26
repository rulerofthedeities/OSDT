import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {FieldsService} from '../services/fields.service';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {ModalConfirm} from '../components/common/modal-confirm.component';

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

        <div class="col-xs-offset-2">
          <div class="searchcats">
            Search Categories:
            <input type="text"
              (keyup)="searchCats(searchcats.value)"
              #searchcats>
          </div>
          <ul class="cats list-unstyled">
            <li *ngFor="let cat of cats" 
              (click)="addCategory(cat.name)"
              class="label label-warning">
                {{cat.name}}
            </li>
          </ul>
        </div>

        <div class="form-group">
          <auto-field 
            [field]="recipientFieldsAssoc['isActive']"
            [data]="recipient"
            [form]="recipientForm">
          </auto-field>
        </div>

        <button 
          type="click"
          (click)="submitForm(recipientForm.value, 'docRecipient')"
          [disabled]="!recipientForm.valid" 
          class="btn btn-success col-xs-offset-2">
          <span class="fa fa-check"></span>
          Save
        </button>

        <button 
          type="submit"
          (click)="submitForm(recipientForm.value, 'viewRecipient')"
          [disabled]="!recipientForm.valid" 
          class="btn btn-success">
          <span class="fa fa-check"></span>
          Save & Close
        </button>

        <button
          class="btn btn-warning" 
          type="button"
          (click)="cancel(confirm)">
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

    <modal-confirm #confirm
      [level]="'warning'"
      (confirmed)="onCancelConfirmed($event)">
      <div title>Warning</div>
      <div message>The recipient has been modified. Are you sure you want to cancel the changes?</div>
    </modal-confirm>

    <!-- Closure will lead to: {{prevNavState}} -->
  `,
  styles:[`
    .doc {
      border:1px solid Gainsboro;
      border-radius:5px;
      background-color: #fffae6;
      padding:6px;
      margin-bottom:12px;
    }
    .label {
      margin:2px;
      cursor:pointer;
    }
    .cats {
      margin-top:6px;
    }
    .searchcats {
      font-size:0.8em;
    }
  `]
})

export class EditRecipient implements OnInit {
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
  @Input() prevNavState: string;
  cats: string[];
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

  searchCats(cats: string):void {
    if (cats.length > 0) {
      this.recipientService.searchCategories(cats).subscribe(
        cats => {this.cats = cats || [];},
        error => this.errorService.handleError(error)
        );
    } else {
      this.cats = [];
    }
  }

  addCategory(newCat: string) {
    let cat: string[] = [];
    cat[0] = this.recipientForm.controls['categories'].value;
    cat[1] = newCat;
    cat = cat.filter(c => !!c);
    this.recipientForm.patchValue({'categories':cat.join(',')});
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.prevNavState = this.editMode ? 'docRecipient' : 'viewRecipient';
  }

  cancel (confirm: ModalConfirm) {
    if (this.recipientForm.dirty) {
      confirm.showModal = true;
    } else {
      this.close();
    }
  }

  onCancelConfirmed(cancelOk: boolean) {
    if (cancelOk) {
      this.close();
    }
  }

  close() {
    this.recipientService.closeRecipient(this.prevNavState);
  }

}
