import Transaction from '@src/domain/entities/Transaction';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
} from '@src/domain/usecases/transactions';
import createTransactionFactory from '@tests/factories/createTransaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Delete transaction', () => {
  it('should be able to delete transaction by id', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const deleteTransactionUsecase = new DeleteTransactionUsecase(
      transactionRepository,
    );
    const transaction = createTransactionFactory();
    const newTransaction = (await createTransactionUsecase.run(
      transaction.id,
      transaction.title,
      transaction.type,
      transaction.value,
      transaction.category,
      transaction.created_at,
      transaction.updated_at,
    )) as Transaction;

    // When
    const result = await deleteTransactionUsecase.run(newTransaction.id);

    // Then
    expect(transactionRepository.transactions.length).toBe(0);
    expect(result).toBeTruthy();
  });
});
