import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionTypeEntity from '@src/domain/entities/TransactionType';
import TransactionValueEntity from '@src/domain/entities/TransactionValue';
import transactionFixture from '@tests/fixtures/transaction';

describe('Transaction entity', () => {
  describe('Success', () => {
    it('should be able to create a new transaction', async () => {
      // Given
      const type = transactionFixture.type.valid.income;
      const value = transactionFixture.value.valid;
      const created_at = new Date();
      const updated_at = new Date();
      const transaction = TransactionEntity.create(
        'any_id',
        'any_title',
        type,
        value,
        'any_category',
        created_at,
        updated_at,
        'any_user_id',
      ) as TransactionEntity;

      // Then
      expect(transaction).toBeInstanceOf(TransactionEntity);
      expect(transaction).toEqual({
        id: 'any_id',
        title: 'any_title',
        type: new TransactionTypeEntity(type),
        value: new TransactionValueEntity(value),
        category: 'any_category',
        created_at,
        updated_at,
        user_id: 'any_user_id',
      });
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new transaction when type is invalid', async () => {
      // Given
      const result = TransactionEntity.create(
        'any_id',
        'any_title',
        transactionFixture.type.invalid,
        transactionFixture.value.valid,
        'any_category',
        new Date(),
        new Date(),
        'any_user_id',
      ) as TransactionEntity;

      // Then
      expect(result).toBeInstanceOf(Error);
    });

    it('should not be able to create a new transaction when value is invalid', async () => {
      // Given
      const result = TransactionEntity.create(
        'any_id',
        'any_title',
        transactionFixture.type.valid.outcome,
        transactionFixture.value.invalid,
        'any_category',
        new Date(),
        new Date(),
        'any_user_id',
      ) as TransactionEntity;

      // Then
      expect(result).toBeInstanceOf(Error);
    });
  });
});
