import TokenAdapter from '@src/adapter/ports/Token';
import jwt from 'jsonwebtoken';

export default class JwtToken implements TokenAdapter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: { id: string }, expiresIn: string): Promise<string> {
    return jwt.sign(plaintext, this.secret, {
      expiresIn: `${expiresIn}d`,
    });
  }

  async decrypt(ciphertext: string): Promise<string | null> {
    const token = jwt.verify(ciphertext, this.secret) as any;
    return token ? token : null;
  }
}
