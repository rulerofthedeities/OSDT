import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DonationService} from '../services/donation.service';
import {ErrorService} from '../services/error.service';
import {Donation} from '../models/donation.model';
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

      <donations>
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
          [recipientId]="recipientId || recipientIds[selectedDonation]?.id"
          [editMode]="isEdit"
          [prevNavState]="'view'">
        </donation>
      </div>
    </div>
  `
})

export class Donations implements OnInit {
  donations: Donation[];
  currentDonation: Donation = null;
  selectedDonation: number = null;
  paramSubscription: Subscription;
  querySubscription: Subscription;
  donationId: string;
  recipientId: string;
  recipientIds: any[];//for all donations -> one recipientId per donation
  isEdit = false;
  isNew = false;

  constructor(
    private donationService: DonationService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
    if (params['id']) {
      this.getDonation(params['id']);
    }});
    this.querySubscription = this.route.queryParams.subscribe(params => {
    if (params['edit']) {
      this.isEdit = params['edit'] === '1' ? true : false;
    }});

    this.donationService.closeToView.subscribe(
      closedDonation => {
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

  addDonation() {
    this.isNew = true;
    this.currentDonation = new Donation('EUR', 10, 'creditcard', new Date(),'');
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
    this.querySubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }
}
