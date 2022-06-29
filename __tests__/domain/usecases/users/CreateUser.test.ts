import { UserDTO } from '@src/domain/dtos/User';
import AlreadyExists from '@src/domain/errors/AlreadyExists';
import InvalidEmail from '@src/domain/errors/InvalidEmail';
import { CreateUserUsecase } from '@src/domain/usecases/users';
import MemoryUserRepository from '@src/infra/databases/memory/repositories/MemoryUser';
import createUserFactory from '@tests/factories/createUser';
import userFixture from '@tests/fixtures/user';

describe('Create User', () => {
  describe('Success', () => {
    it('should be able to create a new user', async () => {
      // Given
      const userRepository = new MemoryUserRepository();
      const createUserUsecase = new CreateUserUsecase(userRepository);
      const user = createUserFactory({
        email: userFixture.email.valid,
        password: userFixture.password.valid,
      });

      // When
      const result = await createUserUsecase.run(
        user.id,
        user.name,
        user.email,
        user.password,
        user.created_at,
        user.updated_at,
      );

      const userSavedInRepository: UserDTO = {
        id: userRepository.users[0]?.id,
        name: userRepository.users[0]?.name,
        email: userRepository.users[0]?.email,
        created_at: userRepository.users[0]?.created_at,
        updated_at: userRepository.users[0]?.updated_at,
      };

      // Then
      expect(result).toEqual(userSavedInRepository);
      expect(userRepository.users.length).toBe(1);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new user when user is invalid', async () => {
      // Given
      const userRepository = new MemoryUserRepository();
      const createUserUsecase = new CreateUserUsecase(userRepository);
      const user = createUserFactory({
        email: userFixture.email.invalid,
        password: userFixture.password.valid,
      });

      // When
      const result = await createUserUsecase.run(
        user.id,
        user.name,
        user.email,
        user.password,
        user.created_at,
        user.updated_at,
      );

      // Then
      expect(result).toBeInstanceOf(InvalidEmail);
      expect(userRepository.users.length).toBe(0);
    });

    it('should not be able to create a new user when user already exists', async () => {
      // Given
      const userRepository = new MemoryUserRepository();
      const createUserUsecase = new CreateUserUsecase(userRepository);
      const user1 = createUserFactory({
        email: 'same-email@gmail.com',
        password: userFixture.password.valid,
      });
      const user2 = createUserFactory({
        email: 'same-email@gmail.com',
        password: userFixture.password.valid,
      });
      await createUserUsecase.run(
        user1.id,
        user1.name,
        user1.email,
        user1.password,
        user1.created_at,
        user1.updated_at,
      );

      // When
      const result = await createUserUsecase.run(
        user2.id,
        user2.name,
        user2.email,
        user2.password,
        user2.created_at,
        user2.updated_at,
      );

      // Then
      expect(result).toBeInstanceOf(AlreadyExists);
      expect(userRepository.users.length).toBe(1);
    });
  });
});
