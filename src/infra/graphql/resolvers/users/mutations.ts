import Unauthorized from '@src/domain/errors/Unauthorized';
import { CreateUserUsecase } from '@src/domain/usecases/users';
import BcryptCryptography from '@src/infra/cryptography/BcryptCryptography';
import PrismaUserRepository from '@src/infra/databases/prisma/repositories/PrismaUser';
import { randomUUID } from 'crypto';

const userRepository = new PrismaUserRepository();
const cryptography = new BcryptCryptography();

const mutations = {
  createUser: async (_: any, args: { data: any }, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const createUserUsecase = new CreateUserUsecase(
      userRepository,
      cryptography,
    );
    const newUser = await createUserUsecase.run(
      randomUUID(),
      args.data.name,
      args.data.email,
      args.data.password,
      new Date(),
      new Date(),
    );
    return newUser;
  },
};

export default mutations;
