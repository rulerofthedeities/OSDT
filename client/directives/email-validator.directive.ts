import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
    providers: [
        provide(NG_VALIDATORS, { useExisting: forwardRef(() => EmailValidator), multi: true })
    ]
})
export class EmailValidator implements Validator {
  constructor(@Attribute('validateEmail') validateEmail: string) {;}

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;

    //value matches pattern
    if (v && !v.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
      return {invalidMail: true};
    }

    return null;
  }
}
