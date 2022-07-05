import { InsertFileDataInDatabaseUsecase } from '@src/application/usecases/files';
import { CreateTransactionUsecase } from '@src/application/usecases/transactions';
import csvFixture from '@tests/fixtures/file';
import MemoryTransactionRepository from '@tests/mocks/repositories/MemoryTransaction';

describe.skip('Insert File', () => {
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
    await insertFileDataInDatabaseUsecase.run(
      csvFixture.filename.valid,
      'user_id',
    );

    // Then
    expect(transactionRepository.transactions).toHaveLength(
      csvFixture.registersLength,
    );
  });
});
