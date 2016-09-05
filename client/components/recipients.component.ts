import {Component, OnInit} from '@angular/core';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';

@Component({
  template: `
    <h3>Recipients</h3>

    <ul>
      <li *ngFor="let recipient of recipients; let i = index"
        (click)="selectRecipient(recipient, i)"> 
        {{recipient.name}}
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
    private errorService: ErrorService
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

  selectRecipient(recipient, i) {
    this.currentRecipient = recipient;
    console.log(recipient, i);
  }
}
