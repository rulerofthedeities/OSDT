import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Donation} from '../models/donation.model';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'donations',
  template: `
    <div *ngIf="!currentDonation">
      <table class="table table-striped" [ngClass]="{'small': isSubview}">
        <tbody>
          <tr *ngFor="let donation of donations; let i=index"
            on-mouseover="selectDonationIndex(i)"
            [ngClass]="{'info':i===selectedDonation}">
            <td>{{i+1}}</td>
            <td class="hover" (click)="openDonation(donation, false)">
              {{recipientIds ? recipientIds[i].name : ''}}
            </td>
            <td class="hover" (click)="openDonation(donation, false)">
              {{donation.amount}} {{donation.currency}}
            </td>
            <td class="hover" (click)="openDonation(donation, false)">
              {{donation.dtPaid|date:'shortDate'}}
            </td>
            <td class="hover" (click)="openDonation(donation, false)">
              {{donation.note}}
            </td>
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
  `,
  styles:[`
    .hover:hover {cursor:pointer;}
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

export class EmbeddedDonations implements OnInit {
  @Input() recipientId: string = '';
  @Input() isSubview: boolean = false;
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
    this.getDonations(this.recipientId);

    this.donationService.closeToView.subscribe(
      closedDonation => {
        if (closedDonation) {
          this.getDonations('');
        }
        this.currentDonation = null;
      }
    );
  }

  getDonations(recipientId: string) {
    this.donationService.getDonations(recipientId)
      .subscribe(
        donations => {this.donations = donations.map(donation => donation.donation);},
        error => this.errorService.handleError(error)
      );
  }

  selectDonationIndex(i: number) {
    this.selectedDonation = i;
  }

  openDonation(donation: Donation, editMode: boolean) {
    let params = {};
    if (editMode) {
      params['edit'] = 1;
    }
    if (this.isSubview) {
      params['sub'] = 1;
    }
    this.router.navigate(['/donations', donation._id], {queryParams: params});
  }
}
