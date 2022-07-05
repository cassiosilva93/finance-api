import CryptographyAdapter from '../../../src/adapter/ports/Cryptography';

export default class FakeCryptography implements CryptographyAdapter {
  private FAKE_SALT = 'FAKECRYPTOGRAPHY';

  async hash(plaintext: string): Promise<string> {
    const hashed = `${plaintext}_${this.FAKE_SALT}`;
    return hashed;
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    const comparation = plaintext === `${digest.split('_')[0]}`;
    return comparation;
  }
}
