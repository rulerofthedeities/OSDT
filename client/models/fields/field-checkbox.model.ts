import {Field} from './field.model';

export class CheckboxField extends Field<string> {
  controlType = 'checkbox';
  display: string;

  constructor(options: {} = {}) {
    super(options);
    this.display = options['display'] || '';
  }
}
