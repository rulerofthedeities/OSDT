import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';
import {Subscription}   from 'rxjs/Subscription';

@Component({
  template: `
    <div *ngIf="!currentRecipient">
      <alert type="info">
        <button
          type="button"
          (click)="addRecipient()"
          class="btn btn-primary">
          <span class="fa fa-plus"></span>
          Add Recipient
        </button>
      </alert>

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
          <template ngFor [ngForOf]="recipients" let-recipient let-i="index">
            <tr class="recipients"
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
              <td class="hover" (click)="selectRecipient(recipient)">
                {{recipient.name}}
              </td>
              <td>
                <span (click)="toggleDonations(i)" class="hover">
                  <span [ngStyle]="{'color':recipient.cnt > 0 ? 'black' : 'darkred'}">
                  {{recipient.cnt}}
                  </span>
                  <span 
                    *ngIf="recipient.cnt > 0"
                    class="fa"
                    [ngClass]="{
                      'fa-plus-square-o':selectedDonations!==i,
                      'fa-minus-square-o':selectedDonations===i
                    }">
                  </span>
                </span>
              </td>
              <td>
                <button class="btn btn-default btn-sm"
                  (click)="editRecipient(recipient)">
                  <span class="fa fa-pencil"></span> Edit
                </button>
              </td>
            </tr>
            <tr *ngIf="selectedDonations===i" class="donations">
              <td colspan="2"></td>
              <td colspan="3">
                <donations
                  [isSubview]="true"
                  [recipientId]="recipients[selectedDonations]._id">
                </donations>
              </td>
            </tr>
          </template>
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
  .hover:hover {cursor:pointer;}
  tr:nth-child(odd) >td {
    background-color:#fffae6;
  }
  tr:nth-child(even) >td {
    background-color:snow;
  }
  tr.recipients:hover >td{
   background-color:#ccffcc;
  }
  .fa{font-size:1.2em}
  `]
})

export class Recipients implements OnInit, OnDestroy {
  recipients:Recipient[] = [];
  currentRecipient: Recipient = null;
  selectedRecipient: number = null;
  selectedDonations: number = null;
  paramSubscription: Subscription;
  isEdit = false;
  isNew = false;
  prevNavState = 'viewRecipient'; //view if closing/canceling must lead back to view

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRecipients();

    this.recipientService.closeToView.subscribe(
      closedRecipient => {
        if (closedRecipient) {
          this.getRecipients();
        }
        this.currentRecipient = null;
      }
    );
  }

  getRecipients() {
    this.recipientService.getRecipients(false)
      .subscribe(
        recipients => {
          this.recipients = recipients;
          this.paramSubscription = this.route.params.subscribe(params => {
            if (params['id']) {
              this.setInitialDonations(params['id']);
            }
          });
        },
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

  toggleDonations(i) {
    this.selectedDonations = this.selectedDonations === i ? null : i;
  }

  setInitialDonations(recipientId: string) {
    let i = 0;
    this.recipients.forEach(recipient => {
      if(recipientId === recipient._id && recipient.cnt > 0) {
        this.toggleDonations(i);
      };
      i++;
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
