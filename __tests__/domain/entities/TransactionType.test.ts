import TransactionTypeEntity from '../../../src/domain/entities/TransactionType';
import IncorrectType from '../../../src/domain/errors/IncorrectType';
import transactionFixture from '../../fixtures/transaction';

describe('TransactionType entity', () => {
  describe('Success', () => {
    it('should be able to create a new transaction type when type is income', async () => {
      // Given
      const type = TransactionTypeEntity.create(
        transactionFixture.type.valid.income,
      ) as TransactionTypeEntity;

      // Then
      expect(type).toBeInstanceOf(TransactionTypeEntity);
      expect(type.type).toBe(transactionFixture.type.valid.income);
    });

    it('should be able to create a new transaction type when type is outcome', async () => {
      // Given
      const type = TransactionTypeEntity.create(
        transactionFixture.type.valid.outcome,
      ) as TransactionTypeEntity;

      // Then
      expect(type).toBeInstanceOf(TransactionTypeEntity);
      expect(type.type).toBe(transactionFixture.type.valid.outcome);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new transaction type when type is invalid', async () => {
      // Given
      const error = TransactionTypeEntity.create(
        transactionFixture.type.invalid,
      ) as Error;

      // Then
      expect(error).toBeInstanceOf(IncorrectType);
      expect(error.message).toBe(new IncorrectType().message);
    });
  });
});
