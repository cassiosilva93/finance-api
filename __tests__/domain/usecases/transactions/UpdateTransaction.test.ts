import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionTypeEntity from '@src/domain/entities/TransactionType';
import TransactionValueEntity from '@src/domain/entities/TransactionValue';
import {
  CreateTransactionUsecase,
  UpdateTransactionUsecase,
} from '@src/domain/usecases/transactions';
import createTransactionEntity from '@tests/factories/createTransaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

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
    const transaction = createTransactionEntity();
    const resultCreateTransactionUsecase = (await createTransactionUsecase.run(
      transaction.id,
      transaction.title,
      transaction.type,
      transaction.value,
      transaction.category,
      transaction.created_at,
      transaction.updated_at,
    )) as TransactionEntity;
    const newData = {
      id: resultCreateTransactionUsecase?.id,
      title: 'title changed',
      category: 'category changed',
      type: new TransactionTypeEntity('income'),
      value: new TransactionValueEntity(1000),
      created_at: new Date(),
      updated_at: new Date(),
    };

    // When
    const result = await updateTransactionUsecase.run(
      resultCreateTransactionUsecase.id,
      newData,
    );

    // Then
    expect(result).toEqual(transactionRepository.transactions[0]);
  });
});
