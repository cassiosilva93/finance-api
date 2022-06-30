export default class MaxLengthEmail extends Error {
  constructor() {
    super('email max length is 255');
  }
}
