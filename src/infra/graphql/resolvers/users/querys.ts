import config from '@src/config';
import LoginUsecase from '@src/domain/usecases/users/Login';
import BcryptCryptography from '@src/infra/cryptography/BcryptCryptography';
import JwtToken from '@src/infra/cryptography/JwtToken';
import PrismaUserRepository from '@src/infra/databases/prisma/repositories/PrismaUser';

const userRepository = new PrismaUserRepository();
const cryptography = new BcryptCryptography();
const jwt = new JwtToken(config.jwt.secret);
const loginUsecase = new LoginUsecase(userRepository, cryptography, jwt);

const querys = {
  login: async (_: any, args: { data: any }) => {
    const token = await loginUsecase.run(args.data.email, args.data.password);
    return token;
  },
};

export default querys;
