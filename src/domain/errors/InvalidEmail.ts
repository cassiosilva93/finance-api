export default class InvalidEmail extends Error {
  constructor() {
    super('invalid email');
  }
}
