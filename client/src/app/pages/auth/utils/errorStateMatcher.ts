import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  // isErrorState(
  //   control: FormControl,
  //   form: FormGroupDirective | NgForm,
  // ): boolean {
  //   return form.hasError('misMatch');
  // }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control?.invalid && control?.dirty) ||
      !!(control?.dirty && control?.parent?.hasError('misMatch'))
  }
}
