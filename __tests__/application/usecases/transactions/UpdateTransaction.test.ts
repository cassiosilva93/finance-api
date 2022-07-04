import {
  CreateTransactionUsecase,
  UpdateTransactionUsecase,
} from '@src/application/usecases/transactions';
import TransactionEntity from '@src/domain/entities/Transaction';
import IncorrectType from '@src/domain/errors/IncorrectType';
import MinimumValue from '@src/domain/errors/MinimumValue';
import createTransactionEntity from '@tests/factories/createTransaction';
import transactionFixture from '@tests/fixtures/transaction';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe('Update transaction', () => {
  describe('Success', () => {
    it('should be able to update a transaction', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const updateTransactionUsecase = new UpdateTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionEntity({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
      });
      const resultCreateTransactionUsecase =
        (await createTransactionUsecase.run(
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
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        created_at: new Date(),
        updated_at: new Date(),
      } as any;

      // When
      const result = await updateTransactionUsecase.run(
        resultCreateTransactionUsecase.id,
        newData,
      );

      // Then
      expect(result).toEqual(transactionRepository.transactions[0]);
    });

    describe('Fail', () => {
      it('should not be able to update a transaction when type is diferent of income or outcome', async () => {
        // Given
        const transactionRepository = new MemoryTransactionRepository();
        const createTransactionUsecase = new CreateTransactionUsecase(
          transactionRepository,
        );
        const updateTransactionUsecase = new UpdateTransactionUsecase(
          transactionRepository,
        );
        const transaction = createTransactionEntity({
          type: transactionFixture.type.invalid,
          value: transactionFixture.value.valid,
        });
        const resultCreateTransactionUsecase =
          (await createTransactionUsecase.run(
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
          type: transactionFixture.type.invalid,
          value: transactionFixture.type.valid,
          created_at: new Date(),
          updated_at: new Date(),
        } as any;

        // When
        const error = (await updateTransactionUsecase.run(
          resultCreateTransactionUsecase.id,
          newData,
        )) as Error;

        // Then
        expect(error).toBeInstanceOf(IncorrectType);
        expect(error.message).toBe(new IncorrectType().message);
      });

      it('should not be able to update a transaction when value is smaller than one', async () => {
        // Given
        const transactionRepository = new MemoryTransactionRepository();
        const createTransactionUsecase = new CreateTransactionUsecase(
          transactionRepository,
        );
        const updateTransactionUsecase = new UpdateTransactionUsecase(
          transactionRepository,
        );
        const transaction = createTransactionEntity({
          type: transactionFixture.type.valid.income,
          value: transactionFixture.value.invalid,
        });
        const resultCreateTransactionUsecase =
          (await createTransactionUsecase.run(
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
          type: transactionFixture.type.valid.outcome,
          value: transactionFixture.value.invalid,
          created_at: new Date(),
          updated_at: new Date(),
        } as any;

        // When
        const error = (await updateTransactionUsecase.run(
          resultCreateTransactionUsecase.id,
          newData,
        )) as Error;

        // Then
        expect(error).toBeInstanceOf(MinimumValue);
        expect(error.message).toBe(new MinimumValue().message);
      });
    });
  });
});
