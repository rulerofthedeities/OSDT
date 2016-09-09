import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';

@Component({
  template: `
    <div  *ngIf="!currentRecipient">
      <button
        type="button"
        (click)="addRecipient()"
        class="btn btn-primary">
        <span class="fa fa-plus"></span>
        Add Recipient
      </button>

      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Active</th>
            <th>Recipient name</th>
            <th>#of donations</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let recipient of recipients; let i=index"
            (click)="selectRecipient(recipient)"
            on-mouseover="selectRecipientIndex(i)"
            [ngClass]="{'info':i===selectedRecipient}">
            <td>{{i+1}}</td>
            <td>
              <span 
                class="fa" 
                [ngClass]="{'fa-check':recipient.isActive,'fa-times':!recipient.isActive}"
                [ngStyle]="{'color':recipient.isActive ? 'green' : 'red'}">
              </span>
            </td>
            <td>{{recipient.name}}</td>
            <td>
              <span [ngStyle]="{'color':recipient.cnt > 0 ? 'black' : 'darkred'}">
              {{recipient.cnt}}
              </span>
              <span 
                *ngIf="recipient.cnt > 0"
                class="fa fa-plus-square-o"
                (click)="selectDonations(recipient)">
              </span>
            </td>
            <td>
              <button class="btn btn-default btn-sm"
                (click)="editRecipient(recipient)">
                <span class="fa fa-pencil"></span> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <recipient *ngIf="currentRecipient"
      [recipient]="currentRecipient"
      [editMode]="isNew || isEdit"
      [prevNavState]=prevNavState>
    </recipient>
  `,
  styles:[`
  td:hover {cursor:pointer;}
  tr:nth-child(odd) >td {
    background-color:#fffae6;
  }
  tr:nth-child(even) >td {
    background-color:snow;
  }
  tr:hover >td{
   background-color:#ccffcc;
  }
  `]
})

export class Recipients implements OnInit {
  recipients:Recipient[] = [];
  currentRecipient: Recipient = null;
  selectedRecipient: number = null;
  isEdit = false;
  isNew = false;
  prevNavState = 'view'; //view if closing/canceling must lead back to view

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecipients();

    this.recipientService.closeToView.subscribe(
      closedRecipient => {
        this.getRecipients();
        this.currentRecipient = null;
      }
    );
  }

  getRecipients() {
    this.recipientService.getRecipients(false)
      .subscribe(
        recipients => {this.recipients = recipients;},
        error => this.errorService.handleError(error)
      );
  }

  editRecipient(recipient: Recipient) {
    this.isEdit = true;
    this.currentRecipient = recipient;
  }

  selectRecipient(recipient) {
    this.isEdit = false;
    this.currentRecipient = recipient;
  }

  selectRecipientIndex(i: number) {
    this.selectedRecipient = i;
  }

  addRecipient() {
    this.isNew = true;
    this.currentRecipient = new Recipient('demoUser', '', '', [], true);
  }

  selectDonations(recipient) {
    this.router.navigate(['/donations', recipient._id]);
  }
}
