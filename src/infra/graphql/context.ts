import config from '@src/config';
import AuthMiddleware from '@src/domain/middlewares/Auth';
import JwtToken from '@src/infra/cryptography/JwtToken';

const context = async ({ req }: any) => {
  const jwt = new JwtToken(config.jwt.secret);
  const authMiddleware = new AuthMiddleware(jwt);
  return {
    token: await authMiddleware.validate({ headers: req.headers }),
  };
};

export default context;
