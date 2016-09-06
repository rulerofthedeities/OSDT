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
    <h3>Donations</h3>

    <div>
      {{currentRecipient ? 'Donations for ' + currentRecipient.name : 'All donations'}}
    </div>

    <button *ngIf="currentRecipient && !currentDonation" 
      type="button"
      (click)="addDonation()"
      class="btn btn-primary">
      Add Donation
    </button>

    <donation *ngIf="currentDonation"
      [donation]="currentDonation"
      [recipient]="currentRecipient"
      editMode=false>
    </donation>

    <ul *ngIf="!currentDonation">
      <li *ngFor="let donation of donations"
        (click)="selectDonation(donation)"> 
        {{donation.note}}
        <!-- <pre>{{donation|json}}</pre> -->
      </li>
    </ul>

    <alert type="info">ng2-bootstrap hello world!</alert>
  `
})

export class Donations implements OnInit {
  donations: Donation[];
  currentDonation: Donation = null;
  currentRecipient: Recipient = null;
  subscription: Subscription;

  constructor(
    private donationService: DonationService,
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let recipientId = params['id'];
      this.getDonations(recipientId);
      this.getRecipient(recipientId);
   });

    this.donationService.added.subscribe(
      addedDonation => {
        this.currentDonation = null;
        this.donations.push(addedDonation);
      }
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
    this.currentDonation = new Donation('EUR', 10, 'creditcard', new Date(),'');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
