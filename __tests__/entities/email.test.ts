import EmailEntity from '@src/domain/entities/Email';
import InvalidEmail from '@src/domain/errors/InvalidEmail';
import MaxLengthEmail from '@src/domain/errors/MaxLengthEmail';
import userFixture from '@tests/fixtures/user';

describe('Email entity', () => {
  describe('Success', () => {
    it('should be able to create a new email', async () => {
      // Given
      const email = EmailEntity.create(userFixture.email.valid) as EmailEntity;

      // Then
      expect(email).toBeInstanceOf(EmailEntity);
      expect(email.email).toBe(userFixture.email.valid);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new email when value is not provided', async () => {
      // Given
      const error = EmailEntity.create(userFixture.email.invalid) as Error;

      // Then
      expect(error).toBeInstanceOf(InvalidEmail);
      expect(error.message).toBe(new InvalidEmail().message);
    });

    it('should not be able to create a new password when string to bigger than 255 characters', async () => {
      // Given
      const error = EmailEntity.create(userFixture.email.tooLarge) as Error;

      // Then
      expect(error).toBeInstanceOf(MaxLengthEmail);
      expect(error.message).toBe(new MaxLengthEmail().message);
    });
  });
});
