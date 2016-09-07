import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';

@Component({
  template: `
    <div  *ngIf="!currentRecipient">
      <button
        type="button"
        (click)="addRecipient()"
        class="btn btn-primary">
        Add Recipient
      </button>

      <ul>
        <li *ngFor="let recipient of recipients">
          <span (click)="selectRecipient(recipient)"> 
            {{recipient.name}} ({{recipient.cnt}}
          </span> <span (click)="selectDonations(recipient)">donation{{recipient.cnt === 1 ? '' :'s'}}</span>)
        </li>
      </ul>
    </div>

    <recipient *ngIf="currentRecipient"
      [recipient]="currentRecipient"
      [editMode]="isNew">
    </recipient>
  `
})

export class Recipients implements OnInit {
  recipients:Recipient[] = [];
  currentRecipient: Recipient = null;
  isNew = false;

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecipients();

    this.recipientService.closed.subscribe(
      closedRecipient => {this.currentRecipient = null;}
    );
  }

  getRecipients() {
    this.recipientService.getRecipients()
      .subscribe(
        recipients => {this.recipients = recipients;},
        error => this.errorService.handleError(error)
      );
  }

  selectRecipient(recipient) {
    this.currentRecipient = recipient;
  }

  addRecipient() {
    this.isNew = true;
    this.currentRecipient = new Recipient('demoUser', '', '', [], true);
  }

  selectDonations(recipient) {
    this.router.navigate(['/donations', recipient._id]);
  }
}
