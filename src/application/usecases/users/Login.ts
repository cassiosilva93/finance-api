import CryptographyAdapter from '../../../adapter/ports/Cryptography';
import TokenAdapter from '../../../adapter/ports/token/Token';
import UserRepository from '../../../application/repositories/User';
import config from '../../../config';
import IncorrectEmailOrPassword from '../../../domain/errors/IncorrectEmailOrPassword';

export default class Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
    private readonly token: TokenAdapter,
  ) {}

  public async run(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return new IncorrectEmailOrPassword();
    const isPasswordValid = await this.cryptography.compare(
      password,
      user.password.password,
    );
    if (!isPasswordValid) return new IncorrectEmailOrPassword();
    const token = await this.token.encrypt(
      { id: user.id },
      config.jwt.expiresInDays,
    );
    return token;
  }
}
