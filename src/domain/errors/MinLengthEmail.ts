export default class MinLengthPassword extends Error {
  constructor() {
    super('password should contain at least 8 characters');
  }
}
