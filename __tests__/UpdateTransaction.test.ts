import {
  CreateTransactionUsecase,
  UpdateTransactionUsecase,
} from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/Disk/repositories/MemoryTransaction';
import TransactionEntity from './domain/entities/Transaction';
import transactionsFixture from './fixtures/transaction';

describe('Update transaction', () => {
  it('should be able to update a transaction', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const updateTransactionUsecase = new UpdateTransactionUsecase(
      transactionRepository,
    );
    const transaction = transactionsFixture[0] as TransactionEntity;
    const resultCreateTransactionUsecase = (await createTransactionUsecase.run(
      transaction,
    )) as TransactionEntity;
    const newData = {
      id: resultCreateTransactionUsecase?.id,
      title: 'title changed',
      category: 'category changed',
      type: 'income',
      value: 1000,
      created_at: new Date(),
      updated_at: new Date(),
    } as TransactionEntity;

    // When
    const result = await updateTransactionUsecase.run(
      resultCreateTransactionUsecase.id,
      newData,
    );

    // Then
    expect(result).toEqual(transactionRepository.transactions[0]);
  });
});
