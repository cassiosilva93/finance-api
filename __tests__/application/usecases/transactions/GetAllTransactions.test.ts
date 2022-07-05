import {
  CreateTransactionUsecase,
  GetAllTransactionsUsecase,
} from '../../../../src/application/usecases/transactions';
import createTransactionFactory from '../../../factories/createTransaction';
import transactionFixture from '../../../fixtures/transaction';
import MemoryTransactionRepository from '../../../mocks/repositories/MemoryTransaction';

describe('Get all transaction', () => {
  describe('Success', () => {
    it('should be able to get all transactions', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
        transactionRepository,
      );
      const transaction1 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });
      const transaction2 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });
      const transactions = [transaction1, transaction2];

      // When
      transactions.forEach(async t => {
        const transaction = await createTransactionUsecase.run(
          t.id,
          t.title,
          t.type,
          t.value,
          t.category,
          t.created_at,
          t.updated_at,
          t.user_id,
        );
        return transaction;
      });
      const result = await getAllTransactionsUsecase.run('user_id');

      // Then
      expect(result.length).toBe(transactions.length);
    });

    it('should be able to get all transactions of a specific user', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
        transactionRepository,
      );
      const transaction1 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id1',
      });
      const transaction2 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id1',
      });
      const transaction3 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id2',
      });
      const transaction4 = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id3',
      });
      const transactions = [
        transaction1,
        transaction2,
        transaction3,
        transaction4,
      ];

      // When
      transactions.forEach(async t => {
        const transaction = await createTransactionUsecase.run(
          t.id,
          t.title,
          t.type,
          t.value,
          t.category,
          t.created_at,
          t.updated_at,
          t.user_id,
        );
        return transaction;
      });
      const result = await getAllTransactionsUsecase.run('user_id1');

      // Then
      expect(result.length).toBe(2);
    });
  });
});
