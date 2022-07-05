import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
} from '../../../../src/application/usecases/transactions';
import Transaction from '../../../../src/domain/entities/Transaction';
import createTransactionFactory from '../../../factories/createTransaction';
import transactionFixture from '../../../fixtures/transaction';
import MemoryTransactionRepository from '../../../mocks/repositories/MemoryTransaction';

describe('Delete transaction', () => {
  describe('Success', () => {
    it('should be able to delete transaction by id', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const deleteTransactionUsecase = new DeleteTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });
      const newTransaction = (await createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      )) as Transaction;

      // When
      const result = await deleteTransactionUsecase.run(newTransaction.id);

      // Then
      expect(transactionRepository.transactions.length).toBe(0);
      expect(result).toBeTruthy();
    });
  });
});
