import IHeader from '@src/adapter/ports/httpRequest/Header';
import AuthMiddleware from '@src/application/middlewares/Auth';
import Unauthorized from '@src/domain/errors/Unauthorized';
import FakeToken from '@tests/mocks/cryptography/FakeToken';

describe('Auth middleware', () => {
  describe('Success', () => {
    it('should be able to validate header authorization', async () => {
      const token = new FakeToken();
      const authMiddleware = new AuthMiddleware(token);

      // Given
      const encryptedInfo = await token.encrypt({ id: 'user.id' }, '1d');
      const params = {
        headers: {
          authorization: `Bearer ${encryptedInfo}`,
        },
      };

      // When
      const result = await authMiddleware.validate(params);

      // Then
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('iat');
      expect(result).toHaveProperty('exp');
    });
  });

  describe('Fail', () => {
    it('should not be able to validate header authorization when authorization not provided', async () => {
      const token = new FakeToken();
      const authMiddleware = new AuthMiddleware(token);

      // Given
      const params = {
        headers: {
          authorization: 'Bearer ',
        },
      };

      // When
      const result = await authMiddleware.validate(params);

      // Then
      expect(result).toBeInstanceOf(Unauthorized);
    });

    it('should not be able to validate header authorization when decoded to fail', async () => {
      const token = new FakeToken();
      jest.spyOn(token, 'decrypt').mockImplementation(async () => null);
      const authMiddleware = new AuthMiddleware(token);
      const encryptedInfo = await token.encrypt({ id: 'user.id' }, '1d');

      // Given
      const params = {
        headers: {
          authorization: `Bearer ${encryptedInfo}`,
        },
      };

      // When
      const result = await authMiddleware.validate(params);

      // Then
      expect(result).toBeInstanceOf(Unauthorized);
    });

    it('should not be able to validate header authorization when authorization not provided', async () => {
      const token = new FakeToken();
      const authMiddleware = new AuthMiddleware(token);

      // Given
      const params = {
        headers: {},
      };

      // When
      const result = await authMiddleware.validate(params as IHeader);

      // Then
      expect(result).toBeInstanceOf(Unauthorized);
    });
  });
});
