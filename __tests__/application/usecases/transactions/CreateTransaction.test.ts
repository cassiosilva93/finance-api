import { CreateTransactionUsecase } from '../../../../src/application/usecases/transactions';
import createTransactionFactory from '../../../factories/createTransaction';
import transactionFixture from '../../../fixtures/transaction';
import MemoryTransactionRepository from '../../../mocks/repositories/MemoryTransaction';

describe('Create transaction', () => {
  describe('Success', () => {
    it('should be able to create a new transaction', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });

      // When
      const result = await createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      );

      // Then
      expect(result).toEqual(transactionRepository.transactions[0]);
      expect(transactionRepository.transactions.length).toBe(1);
    });
  });

  describe('Fail', () => {
    it('should not be able to create a new transaction when type is incorrect', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.invalid,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });

      // When
      const error = await createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      );

      // Then
      expect(error).toBeInstanceOf(Error);
    });

    it('should not be able to create a new transaction when value is incorrect', async () => {
      // Given
      const transactionRepository = new MemoryTransactionRepository();
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.invalid,
        userId: 'user_id',
      });

      // When
      const error = await createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      );

      // Then
      expect(error).toBeInstanceOf(Error);
    });

    it('should not be able to create a new transaction when there is an error while creating the transaction', async () => {
      const transactionRepository = new MemoryTransactionRepository();
      jest
        .spyOn(transactionRepository, 'create')
        .mockImplementation(async () => null);

      // Given
      const createTransactionUsecase = new CreateTransactionUsecase(
        transactionRepository,
      );
      const transaction = createTransactionFactory({
        type: transactionFixture.type.valid.income,
        value: transactionFixture.value.valid,
        userId: 'user_id',
      });

      // When
      const error = (await createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      )) as Error;

      // Then
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('create transaction failed');
    });
  });
});
