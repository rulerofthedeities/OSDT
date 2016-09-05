import {Field} from './field.model';

export class DateField extends Field<string> {
  controlType = 'date';
  minDate: string;

  constructor(options: {} = {}) {
    super(options);
    this.minDate = options['minDate'] || [];
  }
}
