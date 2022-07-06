import EmailEntity from '../../../src/domain/entities/Email';
import PasswordEntity from '../../../src/domain/entities/Password';
import UserEntity from '../../../src/domain/entities/User';

describe('User entity', () => {
  describe('Success', () => {
    it('should be able to create a new user', async () => {
      // Given
      const created_at = new Date();
      const updated_at = new Date();
      const user = UserEntity.create(
        'any_id',
        'any_name',
        'any@email.com',
        'any_password',
        created_at,
        updated_at,
      ) as UserEntity;

      // Then
      expect(user).toBeInstanceOf(UserEntity);
      expect(user).toEqual({
        id: 'any_id',
        name: 'any_name',
        email: new EmailEntity('any@email.com'),
        password: new PasswordEntity('any_password'),
        created_at,
        updated_at,
      });
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new user when password is invalid', async () => {
      // Given
      const result = UserEntity.create(
        'any_id',
        'any_name',
        'any@email.com',
        '',
        new Date(),
        new Date(),
      ) as UserEntity;

      // Then
      expect(result).toBeInstanceOf(Error);
    });
  });
});
