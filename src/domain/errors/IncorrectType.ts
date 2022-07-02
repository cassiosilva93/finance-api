export default class IncorrectType extends Error {
  constructor() {
    super('type should be income or outcome');
  }
}
