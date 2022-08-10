import CreateTransactionUsecase from '@src/application/usecases/transactions/CreateTransaction';
import GetConsolidatedValuesUsecase from '@src/application/usecases/transactions/GetConsolidatedValues';
import { createTransactions as createTransactionsFactory } from '@tests/factories/createTransaction';
import transactionFixture from '@tests/fixtures/transaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Get consolided values', () => {
  describe('Success', () => {
    it('should be able to get consodated transactions values of a specific user', async () => {
      const userIds = {
        user1: 'user_id1',
        user2: 'user_id2',
      };

      const transactionRepository = new MemoryTransactionRepository();
      const getConsolidedValuesUsecase = new GetConsolidatedValuesUsecase(
        transactionRepository,
      );
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const transactionsIncomeUser1 = createTransactionsFactory({
        type: transactionFixture.type.valid.income,
        value: 100,
        userId: userIds.user1,
        quantityRegisters: 10,
      });

      const transactionsOutcomeUser1 = createTransactionsFactory({
        type: transactionFixture.type.valid.outcome,
        value: 70,
        userId: userIds.user1,
        quantityRegisters: 5,
      });

      const transactionsIncomeUser2 = createTransactionsFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: userIds.user2,
        quantityRegisters: 10,
      });

      const transactions = [
        transactionsIncomeUser1,
        transactionsOutcomeUser1,
        transactionsIncomeUser2,
      ];

      // Given
      transactions.forEach(async t => {
        t.forEach(async t => {
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
      });

      // When
      const result = await getConsolidedValuesUsecase.run('user_id1');

      // Then
      expect(result?.totalIncome).toBe(1000);
      expect(result?.totalOutcome).toBe(350);
      expect(result?.totalTransactionRegister).toBe(15);
    });
  });

  it('should return null when not exists transactions registered', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const getConsolidedValuesUsecase = new GetConsolidatedValuesUsecase(
      transactionRepository,
    );

    // When
    const result = await getConsolidedValuesUsecase.run(
      'user_without_transactions',
    );

    // Then
    expect(result).toBeNull();
  });
});
