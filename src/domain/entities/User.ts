import InvalidEmail from '../errors/InvalidEmail';
import MaxLengthEmail from '../errors/MaxLengthEmail';
import MinLengthPassword from '../errors/MinLengthPassword';
import RequiredProperty from '../errors/RequiredProperty';
import EmailEntity from './Email';
import PasswordEntity from './Password';

export default class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: EmailEntity,
    public readonly password: PasswordEntity,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}

  static create(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
  ):
    | User
    | RequiredProperty
    | MinLengthPassword
    | InvalidEmail
    | MaxLengthEmail {
    const emailOrError = EmailEntity.create(email);
    const passwordOrError = PasswordEntity.create(password);
    if (emailOrError instanceof Error) return emailOrError;
    if (passwordOrError instanceof Error) return passwordOrError;
    return new User(
      id,
      name,
      emailOrError,
      passwordOrError,
      created_at,
      updated_at,
    );
  }
}
