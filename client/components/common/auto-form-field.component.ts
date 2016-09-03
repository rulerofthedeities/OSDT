import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../../models/field.model';

@Component({
  selector: 'auto-field',
  template: `
    <div [formGroup]="form">
      <label 
        [attr.for]="field.key">
        {{field.label}}
      </label>

      <div [ngSwitch]="field.controlType">
        <input 
          *ngSwitchCase="'textbox'" 
          [formControlName]="field.key"
          [id]="field.key"
          [type]="field.type">

        <select 
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
            <input 
              type="radio"
              [value]="button.key" 
              [formControlName]="field.key">
              {{button.display}}
          </div>
        </div>

        <div *ngSwitchCase="'checkbox'">
          <input 
            [formControlName]="field.key"
            [id]="field.key"
            type="checkbox">{{field.display}}
        </div> 

      <div class="errorMessage" *ngIf="!isValid">{{field.label}} is required</div>

    </div>
  `
})

export class AutoFormField {
  @Input() field: Field<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
}
