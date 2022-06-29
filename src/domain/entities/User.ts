export default class User {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
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
}
