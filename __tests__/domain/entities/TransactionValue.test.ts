import TransactionValueEntity from '@src/domain/entities/TransactionValue';
import MinimumValue from '@src/domain/errors/MinimumValue';
import transactionFixture from '@tests/fixtures/transaction';

describe('TransactionValue entity', () => {
  describe('Success', () => {
    it('should be able to create a new transaction value when value is greather than zero', async () => {
      // Given
      const value = TransactionValueEntity.create(
        transactionFixture.value.valid,
      ) as TransactionValueEntity;

      // Then
      expect(value).toBeInstanceOf(TransactionValueEntity);
      expect(value.value).toBe(transactionFixture.value.valid);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new transaction value when value is less than or equal zero', async () => {
      // Given
      const error = TransactionValueEntity.create(
        transactionFixture.value.invalid,
      ) as Error;

      // Then
      expect(error).toBeInstanceOf(MinimumValue);
      expect(error.message).toBe(new MinimumValue().message);
    });
  });
});
