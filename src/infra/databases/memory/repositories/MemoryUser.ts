import UserEntity from '@src/domain/entities/User';
import UserRepository from '@src/domain/repositories/User';

export default class MemoryUser implements UserRepository {
  public users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async create({
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
  }: UserEntity): Promise<UserEntity | null> {
    this.users.push({
      id,
      name,
      email,
      password,
      created_at,
      updated_at,
    });
    const user = this.users.find(u => u.id === id);
    return user || null;
  }
}
