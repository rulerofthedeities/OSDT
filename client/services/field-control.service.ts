import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Field} from '../models/field.model';

@Injectable()
export class FieldControlService {

  toFormGroup(fields: Field<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                        : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}