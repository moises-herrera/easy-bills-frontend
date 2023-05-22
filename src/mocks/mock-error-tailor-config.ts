/**
 * Mocks the error tailor config
 */
export const mockErrorsConfig = {
  errors: {
    useValue: {
      required: 'This field is required',
      minlength: () => 'Min length error',
      min: () => 'Min error',
      pattern: 'Pattern error',
      passwordsMatch: 'Passwords match error',
    },
  }
}
