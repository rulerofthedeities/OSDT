import {Component, OnInit} from '@angular/core';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {RecipientModel} from '../models/recipient.model';

@Component({
  template: `
    <div>Recipients</div>

    <ul>
      <li *ngFor="let recipient of recipients">
        {{recipient.name}}
      </li>
    </ul>
  `
})

export class Recipient implements OnInit {
  recipients:RecipientModel[] = [];

  constructor(
    private recipientService: RecipientService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.recipientService.getRecipients()
      .subscribe(
        recipients => {this.recipients = recipients;},
        error => this.errorService.handleError(error)
      );
  }
}
