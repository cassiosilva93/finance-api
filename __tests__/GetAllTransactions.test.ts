import {
  CreateTransactionUsecase,
  GetAllTransactionsUsecase,
} from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/Disk/repositories/MemoryTransaction';
import transactionsFixture from './fixtures/transaction';

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
    for await (const transaction of transactionsFixture) {
      await createTransactionUsecase.run(transaction);
    }

    const result = await getAllTransactionsUsecase.run();

    // Then
    expect(result.length).toBe(transactionsFixture.length);
  });
});
