import UserEntity from '@src/domain/entities/User';
import { CreateUserUsecase } from '@src/domain/usecases/users';
import PrismaUserRepository from '@src/infra/databases/prisma/repositories/PrismaUser';
import { randomUUID } from 'crypto';

const userRepository = new PrismaUserRepository();

const mutations = {
  createUser: async (_: any, args: { data: UserEntity }) => {
    const createUserUsecase = new CreateUserUsecase(userRepository);
    const user: UserEntity = {
      id: randomUUID(),
      name: args.data.name,
      email: args.data.email,
      password: args.data.password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const newUser = await createUserUsecase.run(user);
    return newUser;
  },
};

export default mutations;
