import { InsertFileDataInDatabaseUsecase } from '@src/domain/usecases/files';
import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/Disk/repositories/MemoryTransaction';
import csvFixture from './fixtures/file';

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
    const result: any = await insertFileDataInDatabaseUsecase.run(
      csvFixture.filename.invalid,
    );

    // Then
    expect(result.code).toBe('ENOENT');
    expect(transactionRepository.transactions).toHaveLength(0);
  });
});
