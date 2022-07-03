import {
  CreateTransactionUsecase,
  GetAllTransactionsUsecase,
} from '@src/domain/usecases/transactions';
import createTransactionFactory from '@tests/factories/createTransaction';
import transactionFixture from '@tests/fixtures/transaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Get all transaction', () => {
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
    });
    const transaction2 = createTransactionFactory({
      type: transactionFixture.type.valid.income,
      value: transactionFixture.value.valid,
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
      );
      return transaction;
    });
    const result = await getAllTransactionsUsecase.run();

    // Then
    expect(result.length).toBe(transactions.length);
  });
});
