import Plaintext from '../criptography/Plaintext';
import IPayload from './Payload';

export default interface Token {
  encrypt: (plaintext: Plaintext, expireIn: string) => Promise<string>;
  decrypt: (ciphertext: string) => Promise<IPayload | null>;
}
