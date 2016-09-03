import {Injectable, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Field} from '../models/fields/field.model';

@Injectable()
export class FieldControlService {
  dataSubmitted = new EventEmitter<any>();

  toFormGroup(fields: Field<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                        : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }

  onDataSubmitted(data: any) {
    this.dataSubmitted.emit(data);
  }
}
