import { AbstractControl, ValidatorFn } from "@angular/forms";

export function EmptyHTMLValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value || control.value.trim() === '' || control.value === '<p></p>' || control.value === '<p><br></p>') {
      return { 'emptyHTML': true }; // Return a proper error key
    }
    return null;
  };
}