import Plaintext from '@src/adapter/ports/criptography/Plaintext';
import IPayload from '@src/adapter/ports/token/Payload';
import TokenAdapter from '@src/adapter/ports/token/Token';
import jwt from 'jsonwebtoken';

export default class JwtToken implements TokenAdapter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: Plaintext, expiresIn: string): Promise<string> {
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
