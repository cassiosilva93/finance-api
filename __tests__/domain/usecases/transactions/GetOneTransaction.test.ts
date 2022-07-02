import TransactionEntity from '@src/domain/entities/Transaction';
import {
  CreateTransactionUsecase,
  GetOneTransactionUsecase,
} from '@src/domain/usecases/transactions';
import createTransactionFactory from '@tests/factories/createTransaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

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
    const transaction = createTransactionFactory();
    const newTransaction = (await createTransactionUsecase.run(
      transaction.id,
      transaction.title,
      transaction.type,
      transaction.value,
      transaction.category,
      transaction.created_at,
      transaction.updated_at,
    )) as TransactionEntity;

    // When
    const result = await getOneTransactionUsecase.run(newTransaction.id);

    // Then
    expect(result).toEqual(newTransaction);
  });
});
