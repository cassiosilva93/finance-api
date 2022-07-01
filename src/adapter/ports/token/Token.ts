import IPayload from './Payload';

export default interface Token {
  encrypt: (plaintext: { id: string }, expireIn: string) => Promise<string>;
  decrypt: (ciphertext: string) => Promise<IPayload | null>;
}
