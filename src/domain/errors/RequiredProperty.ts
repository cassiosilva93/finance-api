export default class RequiredProperty extends Error {
  constructor(property: string) {
    super(`${property} is required`);
  }
}
