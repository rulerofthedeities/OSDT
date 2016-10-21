import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {Recipient} from '../models/recipient.model';
import {Field} from '../models/fields/field.model';
import {FieldsService} from '../services/fields.service';
import {RecipientService} from '../services/recipient.service';
import {ValidationService} from '../services/validation.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {ModalConfirm} from '../components/common/modal-confirm.component';

@Component({
  selector:'recipient',
  template: `
    <alert type="info" *ngIf="!editMode" class="hidden-print">
      <button *ngIf="!editMode"
        type="button"
        class="btn btn-primary" 
        (click)="toggleEditMode()">
        <span class="fa fa-pencil"></span>
        Edit Mode
      </button>

      <button 
        type="button" 
        class="btn btn-primary"
        (click)="isCollapsedLog = !isCollapsedLog">
        <span class="fa fa-th-list" [style.color]="isCollapsedLog ? 'white': 'lightgrey'"></span>
        {{isCollapsedLog ? 'Show Update Log' : 'Hide Update Log'}}
      </button>

      <button *ngIf="!editMode"
        type="button"
        class="btn btn-primary" 
        (click)="print()">
        <span class="fa fa-print"></span>
        Print
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
            [field]="recipientFieldsAssoc['url']"
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
        <div [collapse]="isCollapsedLog" class="row">
          <label 
            class="control-label col-xs-2 text-right">
            Update history
          </label>
          <div class="log col-xs-10">
            <table class="table table-hover small">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let update of recipient.updateLog">
                  <td class="date">{{update.dt | date:'medium'}}</td>
                  <td>{{update.action}}</td>
                  <td>{{update.user}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="read-buttons hidden-print">
        <button
          class="btn btn-warning" 
          type="button"
          (click)="close()">
          <span class="fa fa-times"></span>
          Close
        </button>
      </div>
    </div>

    <modal-confirm #confirm
      [level]="'warning'"
      (confirmed)="onCancelConfirmed($event)"
      class="hidden-print">
      <div title>Warning</div>
      <div message>The recipient has been modified. Are you sure you want to cancel the changes?</div>
    </modal-confirm>


    <div class="visible-print-block small">
      <em>Printed on {{getCurrentDate()|date:'medium'}}</em>
    </div>


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
    .log{
      max-width:400px;
    }
    .log .date {
      width: 160px;
    }
    .log tr>th, .log tr>td {
      line-height:0.5;
    }
    .log tr>td {
      cursor: default;
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
  isCollapsedLog:boolean = true;

  constructor (
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private fieldsService: FieldsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: Http
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
      'name': [
        this.recipient.name,
        Validators.required,
        ValidationService.checkUniqueRecipient(this.http, this.authService, this.recipient._id)
      ],
      'description': [this.recipient.description],
      'categories': [this.recipient.categories],
      'url': [this.recipient.url],
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
        () => {
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

  print() {
    window.print();
  }

  getCurrentDate() {
    return new Date();
  }

  close() {
    this.recipientService.closeRecipient(this.prevNavState);
  }

}
