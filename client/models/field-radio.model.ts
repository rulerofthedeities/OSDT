import {Field} from './field.model';

export class RadioField extends Field<string> {
  controlType = 'radio';
  buttons: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.buttons = options['buttons'] || [];
  }
}
