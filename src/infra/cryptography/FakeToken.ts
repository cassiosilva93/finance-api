import TokenAdapter from '@src/adapter/ports/Token';

export default class FakeToken implements TokenAdapter {
  async encrypt(plaintext: { id: string }, _: string): Promise<string> {
    return Buffer.from(plaintext.id).toString('base64');
  }

  async decrypt(ciphertext: string): Promise<string | null> {
    const token = Buffer.from(ciphertext, 'base64').toString('ascii');
    return token ? token : null;
  }
}
