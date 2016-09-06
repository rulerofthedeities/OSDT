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
          [ngModel]="data[field.key]"
          [id]="field.key"
          [type]="field.type">

        <textarea 
          *ngSwitchCase="'textarea'" 
          class="form-control"
          [placeholder]="field.placeholder"
          [readonly]="field.readonly"
          [rows]="field.rows"
          [cols]="field.cols"
          [formControlName]="field.key"
          [ngModel]="data[field.key]"
          [id]="field.key">
        </textarea>

        <select 
          class="form-control"
          [id]="field.key" 
          [formControlName]="field.key"
          [ngModel]="data[field.key]"
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
                [formControlName]="field.key"
                [ngModel]="data[field.key]">
                {{button.display}}
              </label>
          </div>
        </div>

        <div *ngSwitchCase="'checkbox'" class="checkbox">
          <input 
            [formControlName]="field.key"
            [ngModel]="data[field.key]"
            [id]="field.key"
            type="checkbox">{{field.display}}
        </div> 
        
      </div>
      <div class="errorMessage" *ngIf="!isValid">{{field.label}} is required</div>

    </div>
  `
})

export class AutoFormField {
  @Input() field: Field<any>;
  @Input() form: FormGroup;
  @Input() data: any;
  get isValid() { return this.form.controls[this.field.key].valid; }
}
