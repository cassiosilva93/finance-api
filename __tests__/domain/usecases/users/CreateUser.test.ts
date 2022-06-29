import UserEntity from '@src/domain/entities/User';
import { CreateUserUsecase } from '@src/domain/usecases/users';
import MemoryUserRepository from '@src/infra/databases/memory/repositories/MemoryUser';
import usersFixture from '@tests/fixtures/user';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    // Given
    const userRepository = new MemoryUserRepository();
    const createUserUsecase = new CreateUserUsecase(userRepository);
    const user = usersFixture[0] as UserEntity;

    // When
    const result = await createUserUsecase.run(user);

    // Then
    expect(result).toEqual(userRepository.users[0]);
    expect(userRepository.users.length).toBe(1);
  });
});
