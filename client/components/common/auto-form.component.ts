import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../../models/fields/field.model';

@Component({
  selector: 'auto-form',
  template: `
  <div *ngFor="let field of fields" class="form-group">
    <auto-field 
      [field]="field"
      [data]="data"
      [form]="form">
    </auto-field>
  </div>
  `
})

export class AutoForm {
  @Input() fields: Field<any>[];
  @Input() form: FormGroup;
  @Input() data: any;
}
