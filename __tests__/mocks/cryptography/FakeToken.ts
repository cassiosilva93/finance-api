import IPayload from '@src/adapter/ports/token/Payload';
import TokenAdapter from '@src/adapter/ports/token/Token';
import config from '@src/config';

export default class FakeToken implements TokenAdapter {
  async encrypt(plaintext: { id: string }, _: string): Promise<string> {
    return Buffer.from(plaintext.id).toString('base64');
  }

  async decrypt(ciphertext: string): Promise<IPayload | null> {
    const id = Buffer.from(ciphertext, 'base64').toString('ascii');
    const iat = new Date().getTime();
    const exp = new Date().setDate(
      new Date().getDate() + Number(config.jwt.expiresInDays),
    );
    const token = {
      id,
      iat,
      exp,
    };
    return token ? token : null;
  }
}
