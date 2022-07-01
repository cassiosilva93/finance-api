import IHeader from '@src/adapter/ports/httpRequest/Header';
import IPayload from '@src/adapter/ports/token/Payload';
import TokenAdapter from '@src/adapter/ports/token/Token';
import Unauthorized from '@src/domain/errors/Unauthorized';

export default class Auth {
  constructor(private readonly token: TokenAdapter) {}

  async validate({
    headers,
  }: IHeader): Promise<Unauthorized | null | IPayload> {
    const authorization = headers.authorization;
    if (!authorization) return new Unauthorized();
    const [, token] = authorization.split(' ');
    if (!token) return new Unauthorized();
    const decodedToken = await this.token.decrypt(token);
    if (!decodedToken) return new Unauthorized();
    return decodedToken;
  }
}
