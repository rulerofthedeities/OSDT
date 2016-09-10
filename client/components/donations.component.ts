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
      <alert type="info">
        <button 
          type="button"
          (click)="addDonation()"
          class="btn btn-primary">
          <span class="fa fa-plus"></span>
          Add Donation
        </button>
      </alert>

      <donations
        [recipientId]="''">
      </donations>
    </div>

    <div *ngIf="currentDonation">
      <div *ngIf="isNew && !recipientId">
        <new-recipient
          (selectedRecipientId)="onSelectedRecipientId($event)">
        </new-recipient>
      </div>

      <div *ngIf="!isNew || recipientId">
        <donation
          [donation]="currentDonation"
          [recipientId]="recipientId || recipientIds[selectedDonation]?.id"
          [editMode]="isEdit">
        </donation>
      </div>
    </div>
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
  donationId: string;
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
    if (params['id']) {
      console.log('fetching donation ', params['id']);
      this.getDonation(params['id']);
      //this.getDonations(this.recipientId);
      //this.getRecipient(this.recipientId);
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

  getDonation(donationId: string) {
    this.donationService.getDonation(donationId).subscribe(
        result => {console.log('result', result);
          this.currentDonation = result.donations[0];
          this.recipientId = result._id;
        },
        error => this.errorService.handleError(error)
      );
  }

/*
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
*/
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

  onSelectedRecipientId(recipientId: string) {
    //New donation, recipient selected
    this.recipientId = recipientId;
    this.isEdit = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
