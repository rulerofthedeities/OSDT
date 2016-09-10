import {Pipe, PipeTransform} from '@angular/core';
import {Field} from '../models/fields/field.model';
import {DropdownField} from '../models/fields/field-dropdown.model';
import {RadioField} from '../models/fields/field-radio.model';

@Pipe({name: 'formatField'})
export class FormatFieldPipe implements PipeTransform {
  transform(value: any, field: Field<any>): string {
    let newValue = value;
    switch(field.controlType) {
      case 'dropdown':
        //find the value in the array of options
        let ddfield = <DropdownField>field;
        let options: {} = ddfield.options.filter(option => option.key === value);
        if (options && options[0]) {
          newValue = options[0].display;
        }
      break;
      case 'radio':
        //find the value in the array of buttons
        let rfield = <RadioField>field;
        let buttons: {} = rfield.buttons.filter(option => option.key === value);
        if (buttons && buttons[0]) {
          newValue = buttons[0].display;
        }
      break;

    }
    return newValue;
  }
}
