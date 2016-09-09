import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DonationService} from '../services/donation.service';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Donation} from '../models/donation.model';
import {Recipient} from '../models/recipient.model';
import {Subscription}   from 'rxjs/Subscription';

@Component({
  template: `
    <div *ngIf="!currentDonation">

      <button 
        type="button"
        (click)="addDonation()"
        class="btn btn-primary">
        <span class="fa fa-plus"></span>
        Add Donation {{currentRecipient ? ' for ' + currentRecipient.name : ''}}
      </button>

      <table class="table table-striped">
        <tbody>
          <tr *ngFor="let donation of donations; let i=index"
            (click)="selectDonation(donation)"
            on-mouseover="selectDonationIndex(i)"
            [ngClass]="{'info':i===selectedDonation}">
            <td>{{i+1}}</td>
            <td>{{recipientId ? '' : recipientIds[i].name}}</td>
            <td>{{donation.amount}} {{donation.currency}}</td>
            <td>{{donation.dtPaid|date:'shortDate'}}</td>
            <td>{{donation.note}}</td>
            <td>
              <button class="btn btn-default btn-sm"
                (click)="editDonation(donation)">
                <span class="fa fa-pencil"></span> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <donation *ngIf="currentDonation"
      [donation]="currentDonation"
      [recipientId]="recipientId || recipientIds[selectedDonation]?.id"
      [editMode]="isNew || isEdit">
    </donation>
  `,
  styles:[`
  td:hover {cursor:pointer;}
  tr:nth-child(odd) >td {
    background-color:#eff5f5;
  }
  tr:nth-child(even) >td {
    background-color:#fdfdff;
  }
  tr:hover >td{
   background-color:#ccffcc;
  }
  `]
})

export class Donations implements OnInit {
  donations: Donation[];
  currentDonation: Donation = null;
  currentRecipient: Recipient = null;
  selectedDonation: number = null;
  subscription: Subscription;
  recipientId: string;
  recipientIds: any[];//for all donations -> one recipientId per donation
  isEdit = false;
  isNew = false;

  constructor(
    private donationService: DonationService,
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.recipientId = params['id'];
      this.getDonations(this.recipientId);
      this.getRecipient(this.recipientId);
   });

    this.donationService.added.subscribe(
      addedDonation => {
        this.currentDonation = null;
        this.donations.push(addedDonation);
      }
    );

    this.donationService.closed.subscribe(
      closedDonation => {this.currentDonation = null;}
    );
  }

  getDonations(recipientId: string) {
    this.donationService.getDonations(recipientId)
      .subscribe(
        donations => {
          this.donations = donations.map(donation => donation.donation);
          if (!recipientId) {
            this.recipientIds = donations.map(donation => donation.recipient);
          }
        },
        error => this.errorService.handleError(error)
      );
  }

  getRecipient(recipientId: string) {
    if (recipientId) {
      this.recipientService.getRecipient(recipientId).subscribe(
        recipient => {this.currentRecipient = recipient;},
        error => this.errorService.handleError(error)
      );
    }
  }

  selectDonation(donation: Donation) {
    this.currentDonation = donation;
  }

  editDonation(donation: Donation) {
    this.isEdit = true;
    this.currentDonation = donation;
  }

  selectDonationIndex(i: number) {
    this.selectedDonation = i;
  }

  addDonation() {
    this.isNew = true;
    this.currentDonation = new Donation('EUR', 10, 'creditcard', new Date(),'');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
