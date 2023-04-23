import { FormGroup } from '@angular/forms';

/** Represents all the common methods to validate a form. */
export class FormValidator {
  /**
   * Validate that the fields are equal.
   *
   * @param fieldName Field name to evaluate.
   * @param secondFieldName Second field name.
   * @returns A function to validate a form group.
   */
  static validateEqualFields(
    fieldName: string,
    secondFieldName: string
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup): void => {
      const formControl = formGroup.get(fieldName);
      const secondFormControl = formGroup.get(secondFieldName);
      const areFieldsValid = formControl?.value === secondFormControl?.value;

      if (areFieldsValid) {
        secondFormControl?.setErrors(null);
      } else {
        secondFormControl?.setErrors({ fieldsAreNotEqual: true });
      }
    };
  };
}
