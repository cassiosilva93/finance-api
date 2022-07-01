export default class Unauthorized extends Error {
  constructor() {
    super('unauthorized user');
  }
}
