import {
  CreateTransactionUsecase,
  GetAllTransactionsUsecase,
} from '@src/domain/usecases/transactions';
import createTransactionFactory from '@tests/factories/createTransaction';
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
    const transaction1 = createTransactionFactory();
    const transaction2 = createTransactionFactory();
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
