import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static matchPassword(password: string, confirmPassword: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const passwordControl = control.get(password);
        const confirmPasswordControl = control.get(confirmPassword);
  
        if (!passwordControl || !confirmPasswordControl) {
          return null;
        }
  
        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ mismatch: true });
          return { mismatch: true };
        } else {
          confirmPasswordControl.setErrors(null);
          return null;
        }
      };
    }
  }