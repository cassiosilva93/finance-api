import AuthMiddleware from '@src/application/middlewares/Auth';
import config from '@src/config';
import JwtToken from '@src/infra/cryptography/JwtToken';

const context = async ({ req }: any) => {
  const jwt = new JwtToken(config.jwt.secret);
  const authMiddleware = new AuthMiddleware(jwt);
  return {
    token: await authMiddleware.validate({ headers: req.headers }),
  };
};

export default context;
