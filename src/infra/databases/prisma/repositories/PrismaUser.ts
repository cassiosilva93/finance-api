import EmailEntity from '@src/domain/entities/Email';
import PasswordEntity from '@src/domain/entities/Password';
import UserEntity from '@src/domain/entities/User';
import UserRepository from '@src/domain/repositories/User';
import prismaClient from '../prismaClient';

export default class PrismaUser implements UserRepository {
  async create(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<UserEntity | null> {
    const user = await prismaClient.users.create({
      data: {
        id,
        name,
        email,
        password,
        created_at,
        updated_at,
      },
    });
    return new UserEntity(
      user.id,
      user.name,
      new EmailEntity(user.email),
      new PasswordEntity(user.password),
      user.created_at,
      user.updated_at,
    );
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prismaClient.users.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return new UserEntity(
        user.id,
        user.name,
        new EmailEntity(user.email),
        new PasswordEntity(user.password),
        user.created_at,
        user.updated_at,
      );
    }
    return null;
  }
}
