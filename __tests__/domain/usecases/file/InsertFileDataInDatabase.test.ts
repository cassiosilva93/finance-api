import { InsertFileDataInDatabaseUsecase } from '@src/domain/usecases/files';
import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/memory/repositories/MemoryTransaction';
import csvFixture from '@tests/fixtures/file';

describe('Insert File', () => {
  it('should be able to insert file in database', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );

    // When
    await insertFileDataInDatabaseUsecase.run(csvFixture.filename.valid);

    // Then
    expect(transactionRepository.transactions).toHaveLength(
      csvFixture.registersLength,
    );
  });

  it('should not be able to insert file in database when file does not exists', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );

    // When
    const result = await insertFileDataInDatabaseUsecase.run(
      csvFixture.filename.invalid,
    );

    // Then
    expect(result).toBe('File not exists.');
    expect(transactionRepository.transactions).toHaveLength(0);
  });
});
