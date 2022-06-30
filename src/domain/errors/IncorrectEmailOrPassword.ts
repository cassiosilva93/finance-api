export default class IncorrectEmailOrPassword extends Error {
  constructor() {
    super('incorrect email or password');
  }
}
