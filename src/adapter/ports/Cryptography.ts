export default interface Cryptography {
  compare: (plaitext: string, digest: string) => Promise<boolean>;
  hash: (plaintext: string) => Promise<string>;
}
