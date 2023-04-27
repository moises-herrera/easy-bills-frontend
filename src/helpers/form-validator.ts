import { FormGroup } from '@angular/forms';

/** Represents all the common methods to validate a form. */
export class FormValidator {
  /** Pattern to validate an email. */
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,7}$';

  /** Pattern to validate a password. */
  static readonly passwordPattern =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{6,}$';

  /**
   * Validate that the password fields are equal.
   *
   * @param fieldName Field name to evaluate.
   * @param secondFieldName Second field name.
   * @returns A function to validate a form group.
   */
  static validatePasswordsMatch(
    fieldName: string,
    secondFieldName: string
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup): void => {
      const formControl = formGroup.get(fieldName);
      const secondFormControl = formGroup.get(secondFieldName);
      const areFieldsValid =
        formControl &&
        secondFormControl &&
        formControl.value === secondFormControl.value;

      if (areFieldsValid) {
        secondFormControl?.setErrors(null);
      } else {
        secondFormControl?.setErrors({ passwordsMatch: true });
      }
    };
  }
}
