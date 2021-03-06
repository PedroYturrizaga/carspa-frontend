import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { isPresent } from '../util/lang';

export const ngvemail: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {

  if (isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  /* tslint:disable */
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : { 'ngvemail': true };
  /* tslint:enable */
};
