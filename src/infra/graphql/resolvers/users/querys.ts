import LoginUsecase from '../../../../application/usecases/users/Login';
import config from '../../../../config';
import BcryptCryptography from '../../../../infra/cryptography/BcryptCryptography';
import JwtToken from '../../../../infra/cryptography/JwtToken';
import PrismaUserRepository from '../../../../infra/databases/prisma/repositories/PrismaUser';

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
