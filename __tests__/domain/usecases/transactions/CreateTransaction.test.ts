import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import createTransactionFactory from '@tests/factories/createTransaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Create transaction', () => {
  it('should be able to create a new transaction', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const transaction = createTransactionFactory();

    // When
    const result = await createTransactionUsecase.run(
      transaction.id as string,
      transaction.title as string,
      transaction.type,
      transaction.value,
      transaction.category as string,
      transaction.created_at as Date,
      transaction.updated_at as Date,
    );

    // Then
    expect(result).toEqual(transactionRepository.transactions[0]);
    expect(transactionRepository.transactions.length).toBe(1);
  });
});
