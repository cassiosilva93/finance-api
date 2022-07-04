import InvalidEmail from '../errors/InvalidEmail';
import MaxLengthEmail from '../errors/MaxLengthEmail';
import RequiredProperty from '../errors/RequiredProperty';

export default class Email {
  public constructor(public readonly email: string) {}

  static isValid(
    email: string,
  ): MaxLengthEmail | InvalidEmail | RequiredProperty | boolean {
    const MAX_EMAIL_LENGTH = 255;
    const VALID_EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) return new RequiredProperty('email');
    if (email.trim().length > MAX_EMAIL_LENGTH) return new MaxLengthEmail();
    if (!VALID_EMAIL_REGEX.test(email)) return new InvalidEmail();
    return true;
  }

  static create(
    email: string,
  ): MaxLengthEmail | InvalidEmail | Email | RequiredProperty {
    const validOrError = this.isValid(email);
    if (validOrError instanceof Error) return validOrError;
    return new Email(email);
  }
}
