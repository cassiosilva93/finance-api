import PasswordEntity from '@src/domain/entities/Password';
import MinLengthPassword from '@src/domain/errors/MinLengthPassword';
import RequiredProperty from '@src/domain/errors/RequiredProperty';
import userFixture from '@tests/fixtures/user';

describe('Password entity', () => {
  describe('Success', () => {
    it('should be able to create a new password', async () => {
      // Given
      const password = PasswordEntity.create(
        userFixture.password.valid,
      ) as PasswordEntity;

      // Then
      expect(password).toBeInstanceOf(PasswordEntity);
      expect(password.password).toBe(userFixture.password.valid);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new password when value is not provided', async () => {
      // Given
      const error = PasswordEntity.create(userFixture.password.empty) as Error;

      // Then
      expect(error).toBeInstanceOf(RequiredProperty);
      expect(error.message).toBe(new RequiredProperty('password').message);
    });

    it('should not be able to create a new password when string to smaller than 10 characters', async () => {
      // Given
      const error = PasswordEntity.create(
        userFixture.password.invalid,
      ) as Error;

      // Then
      expect(error).toBeInstanceOf(MinLengthPassword);
      expect(error.message).toBe(new MinLengthPassword().message);
    });
  });
});
