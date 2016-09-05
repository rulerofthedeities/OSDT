import {Component, Input} from '@angular/core';
import {Recipient} from '../models/recipient.model';

@Component({
  selector:'recipient',
  template: `Recipient
    <pre>{{recipient|json}}</pre>
  `
})

export class EditRecipient {
  @Input() recipient: Recipient;
  @Input() editMode: boolean;
}
