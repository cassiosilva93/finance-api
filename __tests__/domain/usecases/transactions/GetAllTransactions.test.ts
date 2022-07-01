import {
  CreateTransactionUsecase,
  GetAllTransactionsUsecase,
} from '@src/domain/usecases/transactions';
import transactionsFixture from '@tests/fixtures/transaction';
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

    // When
    transactionsFixture.forEach(async t => {
      const transaction = await createTransactionUsecase.run(t);
      return transaction;
    });

    const result = await getAllTransactionsUsecase.run();

    // Then
    expect(result.length).toBe(transactionsFixture.length);
  });
});
