import bcrypt from 'bcrypt';
import CryptographyAdapter from '../../adapter/ports/Cryptography';

export default class BcryptCryptography implements CryptographyAdapter {
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
