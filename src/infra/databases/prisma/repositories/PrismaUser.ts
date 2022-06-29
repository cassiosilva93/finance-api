import UserEntity from '@src/domain/entities/User';
import UserRepository from '@src/domain/repositories/User';
import prismaClient from '../prismaClient';

export default class PrismaUser implements UserRepository {
  async create({
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
  }: UserEntity): Promise<UserEntity | null> {
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
    return user;
  }
}
