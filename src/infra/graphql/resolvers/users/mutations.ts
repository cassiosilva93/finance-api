import { randomUUID } from 'crypto';
import { CreateUserUsecase } from '../../../../application/usecases/users';
import Unauthorized from '../../../../domain/errors/Unauthorized';
import BcryptCryptography from '../../../../infra/cryptography/BcryptCryptography';
import PrismaUserRepository from '../../../../infra/databases/prisma/repositories/PrismaUser';

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
