import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Donation} from '../models/donation.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'donations',
  template: `
    <div *ngIf="!currentDonation">
      <table class="table table-striped small">
        <tbody>
          <tr *ngFor="let donation of donations; let i=index"
            (click)="openDonation(donation, false)"
            on-mouseover="selectDonationIndex(i)"
            [ngClass]="{'info':i===selectedDonation}">
            <td>{{i+1}}</td>
            <td>{{recipientIds ? recipientIds[i].name : ''}}</td>
            <td>{{donation.amount}} {{donation.currency}}</td>
            <td>{{donation.dtPaid|date:'shortDate'}}</td>
            <td>{{donation.note}}</td>
            <td>
              <button class="btn btn-default btn-sm"
                (click)="openDonation(donation, true)">
                <span class="fa fa-pencil"></span> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})

export class EmbeddedDonations implements OnInit {
  @Input() recipientId: string;
  donations: Donation[];
  currentDonation: Donation = null;
  selectedDonation: number = null;
  isEdit = false;

  constructor(
    private donationService: DonationService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDonations();
  }

  getDonations() {
    this.donationService.getDonations('')
      .subscribe(
        donations => {this.donations = donations.map(donation => donation.donation);},
        error => this.errorService.handleError(error)
      );
  }
/*
  selectDonation(donation: Donation) {
    console.log('selected donation', donation);
    this.currentDonation = donation;
  }

  editDonation(donation: Donation) {
    this.isEdit = true;
    this.currentDonation = donation;
  }
  */

  selectDonationIndex(i: number) {
    this.selectedDonation = i;
  }

  openDonation(donation: Donation, editMode: boolean) {
    this.router.navigate(['/donations', donation._id]);
  }
}
