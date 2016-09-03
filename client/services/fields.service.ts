import {Injectable} from '@angular/core';
import {Field} from '../models/field.model';
import {TextboxField} from '../models/field-textbox.model';
import {DropdownField} from '../models/field-dropdown.model';
import {RadioField} from '../models/field-radio.model';

@Injectable()
export class FieldsService {

  getDonationFields() {

    let fields: Field<any>[] = [

      new DropdownField({
        key: 'paymentType',
        label: 'Payment Type',
        options: [
          {key: 'creditcard', display: 'Credit Card'},
          {key: 'debitcard', display: 'Debit Card'},
          {key: 'paypal', display: 'Paypal'},
          {key: 'cash', display: 'Cash'}
        ],
        order: 3
      }),

      new RadioField({
        key: 'currency',
        label: 'Currency',
        buttons: [
          {key: 'EUR', display: 'Euro'},
          {key: 'USD', display: 'US Dollar'}
        ],
        value: 'EUR',
        order: 2
      }),

      new TextboxField({
        key: 'amount',
        label: 'Amount',
        type: 'number',
        value: 10,
        order: 1
      }),

      new TextboxField({
        key: 'note',
        label: 'Note',
        type: 'text',
        order: 4
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
