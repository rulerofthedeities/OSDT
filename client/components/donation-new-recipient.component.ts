import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RecipientService} from '../services/recipient.service';
import {ErrorService} from '../services/error.service';
import {Recipient} from '../models/recipient.model';

@Component({
  selector:'new-recipient',
  template:`
    <div class="row">
      <form>
        <div class="form-group">
          <label 
            [attr.for]="recipient"
            class="control-label">
            Select the recipient for this donation:
          </label>
          <div>
            <select 
              class="form-control"
              [id]="recipient" 
              (change)="recipientSelected(recipient.value)" 
              #recipient>
              <option value="">Select a recipient...</option>
              <option 
                *ngFor="let recipient of recipients" 
                [value]="recipient._id">
                {{recipient.name}}
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
  `
})

export class DonationNewRecipient implements OnInit {
  @Output() selectedRecipientId = new EventEmitter<string>();
  recipients: Recipient[];

  constructor (
    private recipientService: RecipientService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.recipientService.getRecipients(true).subscribe(
      recipients => {this.recipients = recipients;},
      error => {this.errorService.handleError(error);}
    );
  }

  recipientSelected(recipientId: string) {
    this.selectedRecipientId.emit(recipientId);
  }
}
