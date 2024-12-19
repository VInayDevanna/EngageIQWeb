import { AbstractControl, ValidatorFn } from "@angular/forms";

// Custom validator to check if value is not zero
export function EmptyHTMLValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === '<p></p>' ? { 'hasValue': true } : null;
    };
  }