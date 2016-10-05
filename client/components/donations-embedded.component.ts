import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Donation} from '../models/donation.model';
import {Recipient} from '../models/recipient.model';
import {Currency} from '../models/currency.model';
import {DonationService} from '../services/donation.service';
import {CurrencyService} from '../services/currency.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {ModalConfirm} from '../components/common/modal-confirm.component';

@Component({
  selector: 'donations',
  template: `
    <div *ngIf="!currentDonation">

      <alert type="info" *ngIf="!recipientId">
        <button 
          type="button"
          (click)="addDonation()"
          class="btn btn-primary">
          <span class="fa fa-plus"></span>
          Add Donation
        </button>

        <button *ngIf="activeDonation !== null"
          type="button"
          (click)="openDonation(null, donations[activeDonation], true)"
          class="btn btn-primary">
          <span class="fa fa-pencil"></span>
          Edit
        </button>

        <button *ngIf="activeDonation !== null"
          type="button"
          (click)="copyDonation(donations[activeDonation])"
          class="btn btn-primary">
          <span class="fa fa-files-o"></span>
          Copy
        </button>

        <button *ngIf="activeDonation !== null"
          type="button"
          (click)="confirmDeletion(confirm)"
          class="btn btn-danger">
          <span class="fa fa-trash-o"></span>
          Delete
        </button>

      </alert>


      <table class="table table-striped" [ngClass]="{'small': isSubview}">
        <thead *ngIf="!isSubview">
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Date</th>
            <th>Recipient</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let donation of donations; let i=index"
            on-mouseover="selectDonationIndex(i)"
            (click)="i===activeDonation || recipientId ? openDonation($event, donation, false) : setActiveDonationIndex(i)"
            [ngClass]="{'info':i===selectedDonation,'active':i===activeDonation && !recipientId, hover:i===activeDonation || recipientId}">
            <td>{{i+1}}</td>
            <td>
              {{donation.amount}} {{donation.currency}}
            </td>
            <td>
              {{donation.dtPaid|date:'shortDate'}}
            </td>
            <td *ngIf="!isSubview">
              {{recipients[i].name}}
            </td>
            <td>
              {{donation.note}}
            </td>
            <td>
              <button class="btn btn-default btn-sm"
                (click)="openDonation($event, donation, true)">
                <span class="fa fa-pencil"></span> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <modal-confirm #confirm
      (confirmed)="onDeletionConfirmed($event)">
      <div title>Warning</div>
      <div message>Are you sure you want to delete the selected donation?</div>
    </modal-confirm>
  `,
  styles:[`
    tr {
      cursor:default;
    }
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
    tr.active {
      outline: thin solid green;
      cursor: pointer;
    }
  `]
})

export class EmbeddedDonations implements OnInit {
  @Input() recipientId: string = '';
  @Input() isSubview: boolean = false;
  @Output() addNewDonation = new EventEmitter<Donation>();
  donations: Donation[];
  recipients: Recipient[];
  currencies: Currency[];
  currentDonation: Donation = null;
  selectedDonation: number = null;
  activeDonation: number = null;
  isEdit = false;

  constructor(
    private donationService: DonationService,
    private currencyService: CurrencyService,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
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
  }

  getDonations(recipientId: string) {
    this.donationService.getDonations(recipientId)
      .subscribe(
        donations => {
          this.donations = donations.map(donation => donation.donation);
          this.recipients = donations.map(donation => donation.recipient);
        },
        error => this.errorService.handleError(error)
      );
  }

  selectDonationIndex(i: number) {
    this.selectedDonation = i;
  }

  setActiveDonationIndex(i: number) {
    this.activeDonation = i;
  }

  addDonation() {
    this.addNewDonation.emit(null);
  }

  copyDonation(donation: Donation) {
    this.addNewDonation.emit(donation);
  }

  confirmDeletion(confirm: ModalConfirm) {
    confirm.showModal = true;
  }

  onDeletionConfirmed(deleteOk: boolean) {
    if (deleteOk) {
      this.deleteDonation(this.activeDonation);
    }
  }

  deleteDonation(donationIndex: number) {
    this.donationService.removeDonation(this.donations[donationIndex]._id, this.recipients[donationIndex]._id).subscribe(
      () => {;},
      error => this.errorService.handleError(error)
    );
    this.donations.splice(donationIndex, 1);
  }

  openDonation(event: MouseEvent, donation: Donation, editMode: boolean) {
    if (event) {
      event.stopPropagation();
    }
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
