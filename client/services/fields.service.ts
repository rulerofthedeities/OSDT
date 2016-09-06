import {Injectable} from '@angular/core';
import {Field} from '../models/fields/field.model';
import {TextboxField} from '../models/fields/field-textbox.model';
import {TextareaField} from '../models/fields/field-textarea.model';
import {DropdownField} from '../models/fields/field-dropdown.model';
import {RadioField} from '../models/fields/field-radio.model';
import {CheckboxField} from '../models/fields/field-checkbox.model';
import {DateField} from '../models/fields/field-date.model';

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
        ]
      }),

      new RadioField({
        key: 'currency',
        label: 'Currency',
        buttons: [
          {key: 'EUR', display: 'Euro'},
          {key: 'USD', display: 'US Dollar'}
        ]
      }),

      new TextboxField({
        key: 'amount',
        label: 'Amount',
        type: 'number'
      }),

      new TextareaField({
        key: 'note',
        label: 'Notes',
        rows: 6,
        cols: 20
      }),

      new DateField({
        key: 'dtPaid',
        label: 'Date paid'
      })
    ];

    return this.makeAssocArray(fields);
  }

  getRecipientFields() {
    let fields: Field<any>[] = [
      new TextboxField({
        key: 'name',
        label: 'Name',
        placeholder: 'Enter the name of the recipient',
        type: 'text'
      }),

      new TextareaField({
        key: 'description',
        label: 'Description',
        rows: 4,
        cols: 20
      }),

      new TextboxField({
        key: 'categories',
        label: 'Categories',
        type: 'text'
      }),

      new CheckboxField({
        key: 'isActive',
        display: 'Recipient is active'
      })
    ];

    return this.makeAssocArray(fields);
  }

  makeAssocArray(fields: Field<any>[]): {[fieldname: string]:Field<any>;} {
    let fieldArr: {[fieldname: string]:Field<any>;} = {};
    fields.forEach(field => fieldArr[field.key] = field);
    return fieldArr;
  }
}
