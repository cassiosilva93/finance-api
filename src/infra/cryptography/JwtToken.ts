import jwt from 'jsonwebtoken';
import IPayload from '../../adapter/ports/token/Payload';
import TokenAdapter from '../../adapter/ports/token/Token';

export default class JwtToken implements TokenAdapter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: { id: string }, expiresIn: string): Promise<string> {
    return jwt.sign(plaintext, this.secret, {
      expiresIn: `${expiresIn}d`,
    });
  }

  async decrypt(ciphertext: string): Promise<IPayload | null> {
    try {
      const token = jwt.verify(ciphertext, this.secret) as IPayload;
      return token;
    } catch {
      return null;
    }
  }
}
