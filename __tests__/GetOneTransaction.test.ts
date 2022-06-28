import TransactionEntity from '@src/domain/entities/Transaction';
import {
  CreateTransactionUsecase,
  GetOneTransactionUsecase,
} from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/Disk/repositories/MemoryTransaction';
import transactionsFixture from './fixtures/transaction';

describe('Get one transaction', () => {
  it('should be able to get one transaction by id', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const getOneTransactionUsecase = new GetOneTransactionUsecase(
      transactionRepository,
    );
    const transaction = transactionsFixture[0] as TransactionEntity;
    const newTransaction = (await createTransactionUsecase.run(
      transaction,
    )) as TransactionEntity;

    // When
    const result = await getOneTransactionUsecase.run(newTransaction.id);

    // Then
    expect(result).toEqual(transaction);
  });
});
