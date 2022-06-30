import CryptographyAdapter from '@src/adapter/ports/Cryptography';
import bcrypt from 'bcrypt';

export default class Bcrypt implements CryptographyAdapter {
  private SALT_ROUNDS = 10;

  async hash(plaintext: string): Promise<string> {
    const hashed = await bcrypt.hash(plaintext, this.SALT_ROUNDS);
    return hashed;
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    const comparation = await bcrypt.compare(plaintext, digest);
    return comparation;
  }
}
