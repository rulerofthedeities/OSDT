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
        Add Donation {{currentRecipient ? ' for ' + currentRecipient.name : ''}}
      </button>

      <div>
        {{currentRecipient ? 'Donations for ' + currentRecipient.name : 'All donations'}}
      </div>

      <ul>
        <li *ngFor="let donation of donations"
          (click)="selectDonation(donation)"> 
          {{donation.note}}
        </li>
      </ul>
    </div>

    <donation *ngIf="currentDonation"
      [donation]="currentDonation"
      [recipientId]="recipientId"
      [editMode]="isNew">
    </donation>

    <alert type="info">ng2-bootstrap hello world!</alert>
  `
})

export class Donations implements OnInit {
  donations: Donation[];
  currentDonation: Donation = null;
  currentRecipient: Recipient = null;
  subscription: Subscription;
  recipientId: string;
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
        donations => {this.donations = donations;},
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

  selectDonation(donation) {
    this.currentDonation = donation;
  }

  addDonation() {
    this.isNew = true;
    this.currentDonation = new Donation('EUR', 10, 'creditcard', new Date(),'');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
