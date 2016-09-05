import {Component, OnInit} from '@angular/core';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {Donation} from '../models/donation.model';

@Component({
  template: `
    <div>Donations</div>

    <ul>
      <li *ngFor="let donation of donations"
        (click)="selectDonation(donation)"> 
        {{donation.note}}
        <!-- <pre>{{donation|json}}</pre> -->
      </li>
    </ul>

    <donation *ngIf="currentDonation"
      [donation]="currentDonation"
      editMode=false>
    </donation>

    <alert type="info">ng2-bootstrap hello world!</alert>
  `
})

export class Donations implements OnInit {
  donations: Donation[];
  currentDonation: Donation = null;

  constructor(
    private donationService: DonationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getDonations();
    this.donationService.added.subscribe(
      addedDonation => {
        this.currentDonation = null;
        this.donations.push(addedDonation);
      }
    );
  }

  getDonations() {
    this.donationService.getDonations()
      .subscribe(
        donations => {this.donations = donations;},
        error => this.errorService.handleError(error)
      );
  }

  selectDonation(donation) {
    this.currentDonation = donation;
  }
}
