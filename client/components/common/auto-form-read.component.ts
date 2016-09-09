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
      <div [ngSwitch]="field.controlType">
        <span *ngSwitchCase="'checkbox'">
          <span class="fa" 
            [ngClass]="{'fa-check':data[field.key],'fa-times':!data[field.key]}"
            [ngStyle]="{'color':data[field.key] ? 'green' : 'red'}">
          </span>
        </span>
        <span *ngSwitchDefault>
          {{data[field.key] | formatField:field }}
        </span>
      </div>
    </div>
  </div>
  `
})

export class AutoFormRead {
  @Input() fields: {[fieldname: string]:Field<any>;} = {};
  @Input() data: any;

}
