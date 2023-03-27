import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedValues = Object.values(control.value);
    const atLeastOneSelected = selectedValues.some((val) => val === true);
    return atLeastOneSelected ? null : { atLeastOneSelected: true };
  };
}
