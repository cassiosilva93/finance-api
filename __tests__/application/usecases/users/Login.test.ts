import CreateUserUsecase from '@src/application/usecases/users/CreateUser';
import LoginUsecase from '@src/application/usecases/users/Login';
import IncorrectEmailOrPassword from '@src/domain/errors/IncorrectEmailOrPassword';
import createUserFactory from '@tests/factories/createUser';
import userFixture from '@tests/fixtures/user';
import FakeCryptography from '@tests/mocks/cryptography/FakeCryptography';
import FakeToken from '@tests/mocks/cryptography/FakeToken';
import MemoryUserRepository from '@tests/mocks/repositories/MemoryUser';

describe('Login', () => {
  const userRepository = new MemoryUserRepository();
  const cryptography = new FakeCryptography();
  const jwt = new FakeToken();

  beforeEach(async () => {
    const createUserUsecase = new CreateUserUsecase(
      userRepository,
      cryptography,
    );
    const user = createUserFactory({
      email: userFixture.email.valid,
      password: userFixture.password.valid,
    });
    await createUserUsecase.run(
      user.id,
      user.name,
      user.email,
      user.password,
      user.created_at,
      user.updated_at,
    );
  });

  describe('Success', () => {
    it('should be able to login', async () => {
      // Given
      const loginUsecase = new LoginUsecase(userRepository, cryptography, jwt);

      // When
      const result = await loginUsecase.run(
        userFixture.email.valid,
        userFixture.password.valid,
      );

      // Then
      expect(result).not.toBeNull();
    });
  });

  describe('Fail', () => {
    it('should not be able to login when email is incorrect', async () => {
      // Given
      const loginUsecase = new LoginUsecase(userRepository, cryptography, jwt);

      // When
      const result = await loginUsecase.run(
        'inexistent@email.com',
        userFixture.password.valid,
      );

      // Then
      expect(result).toBeInstanceOf(IncorrectEmailOrPassword);
    });

    it('should not be able to login when password is incorrect', async () => {
      // Given
      const loginUsecase = new LoginUsecase(userRepository, cryptography, jwt);

      // When
      const result = await loginUsecase.run(
        userFixture.email.valid,
        'incorrect_password',
      );

      // Then
      expect(result).toBeInstanceOf(IncorrectEmailOrPassword);
    });
  });
});
