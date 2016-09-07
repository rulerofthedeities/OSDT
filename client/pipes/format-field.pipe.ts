import {Pipe, PipeTransform} from '@angular/core';
import {Field} from '../models/fields/field.model';

@Pipe({name: 'formatField'})
export class FormatFieldPipe implements PipeTransform {
  transform(value: any, field: Field<any>): string {
    let newValue = value;
    switch(field.controlType) {
      case 'dropdown':
        //find the value in the array of options
        let options = field.options.filter(option => option.key === value);
        if (options && options[0]) {
          newValue = options[0].display;
        }
      break;
      case 'radio':
        //find the value in the array of buttons
        let buttons = field.buttons.filter(option => option.key === value);
        if (buttons && buttons[0]) {
          newValue = buttons[0].display;
        }

      break;

    }
    return newValue;
  }
}
