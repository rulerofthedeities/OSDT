import {Component, Input} from '@angular/core';
import {Field} from '../../models/fields/field.model';

@Component({
  selector: 'auto-form-read',
  template: `
  <div *ngFor="let field of fields" class="row">
    <label 
      [attr.for]="field.key"
      class="control-label col-xs-2 text-right">
      {{field.label}}
    </label>
    <div class="col-xs-10" [id]="field.key">
      {{data[field.key] | formatField:field }}
    </div>
  </div>
  `
})

export class AutoFormRead {
  @Input() fields: {[fieldname: string]:Field<any>;} = {};
  @Input() data: any;

}
