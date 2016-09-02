import {Component, OnInit} from '@angular/core';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {Donation} from '../models/donation.model';

@Component({
  template: `
    <div>Donations</div>

    <ul>
      <li *ngFor="let donation of donations">
        <pre>{{donation|json}}</pre>
      </li>
    </ul>
    <alert type="info">ng2-bootstrap hello world!</alert>
  `
})

export class Donations implements OnInit {
  donations:Donation[];

  constructor(
    private donationService: DonationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getDonations();
  }

  getDonations() {
    this.donationService.getDonations()
      .subscribe(
        donations => {this.donations = donations;},
        error => this.errorService.handleError(error)
      );
  }
}
