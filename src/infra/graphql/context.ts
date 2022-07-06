import AuthMiddleware from '../../application/middlewares/Auth';
import config from '../../config';
import JwtToken from '../../infra/cryptography/JwtToken';

const context = async ({ req }: any) => {
  const jwt = new JwtToken(config.jwt.secret);
  const authMiddleware = new AuthMiddleware(jwt);
  return {
    token: await authMiddleware.validate({ headers: req.headers }),
  };
};

export default context;
