import {
  CreateTransactionUsecase,
  GetOneTransactionUsecase,
} from '@src/application/usecases/transactions';
import TransactionEntity from '@src/domain/entities/Transaction';
import createTransactionFactory from '@tests/factories/createTransaction';
import transactionFixture from '@tests/fixtures/transaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Get one transaction', () => {
  describe('Success', () => {
    it('should be able to get a transaction by id', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const getOneTransactionUsecase = new GetOneTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
      });
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
      expect(result).toEqual({
        id: newTransaction.id,
        title: newTransaction.title,
        type: newTransaction.type.type,
        value: newTransaction.value.value,
        category: newTransaction.category,
        created_at: newTransaction.created_at,
        updated_at: newTransaction.updated_at,
      });
    });

    describe('Fail', () => {
      it('should not be able to get a transaction by id when id not exists', async () => {
        // Given
        const transactionRepository = new MemoryTransactionRepository();
        const createTransactionUsecase = new CreateTransactionUsecase(
          transactionRepository,
        );
        const getOneTransactionUsecase = new GetOneTransactionUsecase(
          transactionRepository,
        );
        const transaction = createTransactionFactory({
          type: transactionFixture.type.valid.income,
          value: transactionFixture.value.valid,
        });
        await createTransactionUsecase.run(
          transaction.id,
          transaction.title,
          transaction.type,
          transaction.value,
          transaction.category,
          transaction.created_at,
          transaction.updated_at,
        );

        // When
        const result = await getOneTransactionUsecase.run('invalid_id');

        // Then
        expect(result).toBeNull();
      });
    });
  });
});
