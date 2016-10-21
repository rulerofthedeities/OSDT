import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipientService} from '../services/recipient.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';
import {Subscription}   from 'rxjs/Subscription';

@Component({
  template: `
  <section>
    <div *ngIf="!currentRecipient">
      <alert type="info">
        <button
          type="button"
          *ngIf="mayCreateRecipient"
          (click)="addRecipient()"
          class="btn btn-primary">
          <span class="fa fa-plus"></span>
          Add Recipient
        </button>

        <button *ngIf="activeRecipient !== null"
          type="button"
          (click)="editRecipient(recipients[activeRecipient])"
          class="btn btn-primary">
          <span class="fa fa-pencil"></span>
          Edit Recipient
        </button>

        <button *ngIf="activeRecipient !== null"
          type="button"
          (click)="toggleActive()"
          class="btn btn-primary">
          <span class="fa"
            [ngClass]="{'fa-check':!recipients[activeRecipient].isActive,'fa-times':recipients[activeRecipient].isActive}"
            [ngStyle]="{'color':!recipients[activeRecipient].isActive ? 'green' : 'red'}">
          </span>
          {{recipients[activeRecipient].isActive ? 'Set Inactive' : 'Set Active'}}
        </button>

        <button *ngIf="mayCreateDonation && activeRecipient !== null && recipients[activeRecipient].isActive"
          type="button"
          (click)="addDonation()"
          class="btn btn-primary">
          <span class="fa fa-plus"></span>
          Add Donation
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
              [ngClass]="{'info':i===selectedRecipient,'active':i===activeRecipient}"
              (click)="i===activeRecipient ? selectRecipient(recipient) : setActiveRecipientIndex(i)">
              <td>{{i+1}}</td>
              <td>
                <span 
                  class="fa" 
                  [ngClass]="{'fa-check':recipient.isActive,'fa-times':!recipient.isActive}"
                  [ngStyle]="{'color':recipient.isActive ? 'green' : 'red'}">
                </span>
              </td>
              <td>
                {{recipient.name}}
              </td>
              <td>
                <span (click)="toggleDonations($event, i)" class="hover">
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

  </section>
  `,
  styles:[`
  tr {
    cursor:default;
  }
  .hover:hover {cursor:pointer;}
  tr:nth-child(odd) >td {
    background-color:#fffae6;
  }
  tr:nth-child(even) >td {
    background-color:snow;
  }
  tr.recipients:hover >td {
    background-color:#ccffcc;
  }
  tr.recipients.active {
    outline: thin solid green;
    cursor: pointer;
  }
  .fa{font-size:1.2em}
  `]
})

export class Recipients implements OnInit, OnDestroy {
  recipients:Recipient[] = [];
  currentRecipient: Recipient = null;
  selectedRecipient: number = null;
  activeRecipient: number = null; // defines view buttons
  selectedDonations: number = null;
  paramSubscription: Subscription;
  isEdit = false;
  isNew = false;
  prevNavState = 'viewRecipient'; //view if closing/canceling must lead back to view
  mayCreateRecipient = false;
  mayCreateDonation = false;

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();

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
    this.recipientService.getRecipients(false).subscribe(
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

  setActiveRecipientIndex(i: number) {
    this.activeRecipient = i;
  }

  toggleActive() {
    if (this.activeRecipient !== null) {
      let recipient = this.recipients[this.activeRecipient];
      let newActiveState = !recipient.isActive;
      recipient.isActive = newActiveState;
      this.recipientService.setActiveState(recipient._id, newActiveState).subscribe(
        active => {recipient.isActive = active;},
        error => this.errorService.handleError(error)
      );
    }
  }

  addRecipient() {
    this.isNew = true;
    this.currentRecipient = new Recipient('demoUser', '', '', [], '', true);
  }

  toggleDonations(event: MouseEvent, i: number) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedDonations = this.selectedDonations === i ? null : i;
  }

  addDonation() {
    if (this.activeRecipient !== null) {
      this.router.navigate(['/donations'], {queryParams: {new: this.recipients[this.activeRecipient]._id}});
    }
  }

  setInitialDonations(recipientId: string) {
    let i = 0;
    this.recipients.forEach(recipient => {
      if(recipientId === recipient._id && recipient.cnt > 0) {
        this.toggleDonations(null, i);
      };
      i++;
    });
  }

  getRoles() {
    if (!this.authService.getUserAccess()) {
      this.authService.setUserAccess(this.route.snapshot.data['access']);
    }
    this.mayCreateRecipient = this.authService.hasRole('CreateRecipient');
    this.mayCreateDonation = this.authService.hasRole('CreateDonation');
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
