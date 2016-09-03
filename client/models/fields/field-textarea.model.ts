import {Field} from './field.model';

export class TextareaField extends Field<string> {
  controlType = 'textarea';
  rows: number;
  cols: number;

  constructor(options: {} = {}) {
    super(options);
    this.rows = options['rows'] || 3;
    this.cols = options['cols'] || 10;
  }
}
