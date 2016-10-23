import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DonationService} from '../services/donation.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {Donation} from '../models/donation.model';
import {Subscription}   from 'rxjs/Subscription';

@Component({
  template: `
  <section>
    <div *ngIf="!currentDonation">
      <donations
        (addNewDonation)="createDonation($event)">
      </donations>
    </div>

    <div *ngIf="currentDonation">
      <div *ngIf="isNew && !recipientId">
        <new-recipient
          (selectedRecipientId)="onSelectedRecipientId($event)">
        </new-recipient>

        <button
          class="btn btn-warning" 
          type="button"
          (click)="cancelNewDonation()">
          <span class="fa fa-times"></span>
          Cancel
        </button>
      </div>

      <div *ngIf="!isNew || recipientId">
        <donation
          [donation]="currentDonation"
          [recipientId]="recipientId"
          [editMode]="isEdit"
          [subView]="isSubView">
        </donation>
      </div>
    </div>
  </section>
  `
})

export class Donations implements OnInit {
  currentDonation: Donation = null;
  paramSubscription: Subscription;
  querySubscription: Subscription;
  recipientId: string;
  isEdit = false;
  isSubView = false; //the donation document was opened from the recipient view
  isNew = false;

  constructor(
    private donationService: DonationService,
    private authService: AuthService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    if (!this.authService.getUserAccess()) {
      this.authService.setUserAccess(this.route.snapshot.data['access']);
    }

    this.paramSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.getDonation(params['id']);
      }
    });
    this.querySubscription = this.route.queryParams.subscribe(params => {
      if (params['edit']) {
        this.isEdit = params['edit'] === '1' ? true : false;
      }
      if (params['sub']) {
        this.isSubView = params['sub'] === '1' ? true : false;
      }
      if (params['new']) {
        this.isSubView = true;
        this.recipientId = params['new'];
        this.addDonation();
      }
    });

    this.donationService.closeToView.subscribe(
      () => {
        this.currentDonation = null; //in case of new
        if (this.router.url !== '/donations') {
          this.router.navigate(['/donations']);
        }
      }
    );
  }

  getDonation(donationId: string) {
    this.donationService.getDonation(donationId).subscribe(
        result => {
          this.currentDonation = result.donations[0];
          this.recipientId = result._id;
        },
        error => this.errorService.handleError(error)
      );
  }

  createDonation(donation: Donation) {
    if (donation) {
      //Copy existing donation
      this.isNew = true;
      this.isEdit = true;
      this.currentDonation = new Donation(donation.currency, donation.amount, donation.paymentType, new Date(), donation.note);
    } else {
      //new donation
      this.addDonation();
    }
  }

  addDonation() {
    this.isNew = true;
    this.isEdit = true;
    this.currentDonation = new Donation('EUR', null, 'creditcard', new Date(), '');
  }

  cancelNewDonation() {
    this.currentDonation = null;
    this.isNew = false;
  }

  onSelectedRecipientId(recipientId: string) {
    //New donation, recipient selected
    this.recipientId = recipientId;
    this.isEdit = true;
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
