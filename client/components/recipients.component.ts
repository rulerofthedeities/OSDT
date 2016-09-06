import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';

@Component({
  template: `
    <h3>Recipients</h3>

    <ul>
      <li *ngFor="let recipient of recipients">
        <span (click)="selectRecipient(recipient)"> 
          {{recipient.name}} ({{recipient.cnt}}
        </span> <span (click)="selectDonations(recipient)">donation{{recipient.cnt === 1 ? '' :'s'}}</span>)
      </li>
    </ul>

    <recipient *ngIf="currentRecipient"
      [recipient]="currentRecipient"
      editMode=false>
    </recipient>
  `
})

export class Recipients implements OnInit {
  recipients:Recipient[] = [];
  currentRecipient: Recipient = null;

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecipients();
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

  selectDonations(recipient) {
    console.log('retrieving donations for ', recipient);
    this.router.navigate(['/donations', recipient._id]);
  }
}
