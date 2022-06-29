import MinLengthPasswordError from '../errors/MinLengthPassword';
import RequiredPropertyError from '../errors/RequiredProperty';

export default class Password {
  public readonly password: string;

  public constructor(password: string) {
    this.password = password;
  }

  static isValid(
    password: string,
  ): boolean | MinLengthPasswordError | RequiredPropertyError {
    const MIN_PASSWORD_LENGTH = 10;
    if (!password) return new RequiredPropertyError('password');
    if (password.length < MIN_PASSWORD_LENGTH)
      return new MinLengthPasswordError();
    return true;
  }

  static create(
    password: string,
  ): MinLengthPasswordError | Password | RequiredPropertyError {
    const validOrError = this.isValid(password);
    if (validOrError instanceof Error) return validOrError;
    return new Password(password);
  }
}
