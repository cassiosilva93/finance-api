import TransactionEntity from '@src/domain/entities/Transaction';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
} from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/memory/repositories/MemoryTransaction';
import transactionsFixture from '@tests/fixtures/transaction';

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
    const transaction = transactionsFixture[0] as TransactionEntity;
    const newTransaction = (await createTransactionUsecase.run(
      transaction,
    )) as TransactionEntity;

    // When
    const result = await deleteTransactionUsecase.run(newTransaction.id);

    // Then
    expect(transactionRepository.transactions.length).toBe(0);
    expect(result).toBeTruthy();
  });
});
