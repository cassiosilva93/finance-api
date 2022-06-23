import CreateTransactionUsecase from '../../../src/domain/usecases/CreateTransaction';
import GetAllTransactionsUsecase from '../../../src/domain/usecases/GetAllTransactions';
import MemoryTransactionRepository from '../../../src/infra/repositories/memory/MemoryTransactionRepository';
import transactionFixture from '../../fixtures/transaction';

it('should be able to create a new transaction', async () => {
  const memoryTransactionRepository = new MemoryTransactionRepository();
  const createTransactionUsecase = new CreateTransactionUsecase(
    memoryTransactionRepository,
  );
  const result = await createTransactionUsecase.run(transactionFixture);
  expect(result).toMatchObject(transactionFixture);
});

it('should be able get all transactions', async () => {
  const memoryTransactionRepository = new MemoryTransactionRepository();
  const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
    memoryTransactionRepository,
  );
  const result = await getAllTransactionsUsecase.run();
  expect(result).toHaveLength(1);
});
