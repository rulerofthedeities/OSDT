import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../../models/field.model';
import {FieldControlService} from '../../services/field-control.service';

@Component({
  selector: 'auto-form',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="form">

      <div *ngFor="let field of fields" class="form-row">
        <auto-field 
          [field]="field" 
          [form]="form">    
        </auto-field>
      </div>

      <div class="form-row">
        <button type="submit" [disabled]="!form.valid">Save</button>
      </div>
    </form>

    <div *ngIf="submitted" class="form-row">
      <strong>Data submitted:</strong><br>{{submitted}}
    </div>
  `
})

export class AutoForm implements OnInit {
  @Input() fields: Field<any>[] = [];
  form: FormGroup;
  submitted = '';

  constructor(private fieldControlService: FieldControlService) {  }

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.fields);
  }

  onSubmit() {
    this.submitted = JSON.stringify(this.form.value);
  }
}
