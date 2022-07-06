import UserRepository from '@src/application/repositories/User';
import EmailEntity from '@src/domain/entities/Email';
import Password from '@src/domain/entities/Password';
import UserEntity from '@src/domain/entities/User';

export default class MemoryUser implements UserRepository {
  public users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async create(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<UserEntity | null> {
    const newUser = new UserEntity(
      id,
      name,
      new EmailEntity(email),
      new Password(password),
      created_at,
      updated_at,
    );
    this.users.push({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    });
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userFound = this.users.find(u => u.email.email === email);
    if (userFound) {
      return new UserEntity(
        userFound.id,
        userFound.name,
        userFound.email,
        userFound.password,
        userFound.created_at,
        userFound.updated_at,
      );
    }
    return null;
  }
}
