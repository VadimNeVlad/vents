import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MatchPasswords implements Validator {
  validate(formGroup: AbstractControl): ValidationErrors | null {
    const { password, confirmPassword } = formGroup.value;

    if (password !== confirmPassword) {
      return {
        passwordsDoesntMatch: true,
      };
    } else {
      return null;
    }
  }
}
