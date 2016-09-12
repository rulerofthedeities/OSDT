import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../../models/fields/field.model';

@Component({
  selector: 'auto-field',
  template: `
    <div [formGroup]="form">
      <label 
        [attr.for]="field.key"
        class="control-label col-xs-2">
        {{field.label}}
      </label>

      <div [ngSwitch]="field.controlType" class="col-xs-10">
        <input 
          *ngSwitchCase="'textbox'" 
          class="form-control"
          [placeholder]="field.placeholder"
          [readonly]="field.readonly"
          [formControlName]="field.key"
          [id]="field.key"
          [type]="field.type">

        <input 
          *ngSwitchCase="'date'" 
          style="max-width:200px;"
          class="form-control"
          [placeholder]="field.placeholder"
          [readonly]="field.readonly"
          [formControlName]="field.key"
          [id]="field.key"
          type="date">

        <textarea 
          *ngSwitchCase="'textarea'" 
          class="form-control"
          [placeholder]="field.placeholder"
          [readonly]="field.readonly"
          [rows]="field.rows"
          [cols]="field.cols"
          [formControlName]="field.key"
          [id]="field.key">
        </textarea>

        <select 
          class="form-control"
          [id]="field.key" 
          [formControlName]="field.key"
          *ngSwitchCase="'dropdown'">
          <option 
            *ngFor="let opt of field.options" 
            [value]="opt.key">
            {{opt.display}}
          </option>
        </select>

        <div *ngSwitchCase="'radio'">
          <div *ngFor="let button of field.buttons">
            <label class="radio-inline">
              <input 
                type="radio"
                [value]="button.key" 
                [formControlName]="field.key">
                {{button.display}}
              </label>
          </div>
        </div>
        
        <div *ngSwitchCase="'checkbox'">
          <div class="input-group">
            <span class="input-group-addon">
              <input 
                [formControlName]="field.key"
                [id]="field.key" 
                type="checkbox">
            </span>
            <span class="form-control">{{field.display}}</span>
        </div>

      </div>
      <field-messages 
        [control]="form.controls[field.key]"
        [label]="field.label">
      </field-messages>
    </div>
  `,
  styleUrls:[`client/components/form.css`]
})

export class AutoFormField {
  @Input() field: Field<any>;
  @Input() form: FormGroup;
  @Input() data: any;
  get isValid() { return this.form.controls[this.field.key].valid; }
}
