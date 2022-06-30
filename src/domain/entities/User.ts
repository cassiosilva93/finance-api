import InvalidEmail from '../errors/InvalidEmail';
import MaxLengthEmail from '../errors/MaxLengthEmail';
import MinLengthPassword from '../errors/MinLengthPassword';
import RequiredProperty from '../errors/RequiredProperty';
import EmailEntity from './Email';
import PasswordEntity from './Password';

export default class User {
  public readonly id: string;

  public readonly name: string;

  public readonly email: EmailEntity;

  public readonly password: PasswordEntity;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor(
    id: string,
    name: string,
    email: EmailEntity,
    password: PasswordEntity,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

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
