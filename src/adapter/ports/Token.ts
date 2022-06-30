export default interface Token {
  encrypt: (plaintext: { id: string }, expireIn: string) => Promise<string>;
  decrypt: (ciphertext: string) => Promise<string | null>;
}
