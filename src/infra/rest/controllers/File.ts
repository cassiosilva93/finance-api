import InsertFileDataInDatabaseUsecase from '@src/domain/usecases/files/InsertFileDataInDatabase';
import SaveFileUsecase from '@src/domain/usecases/files/SaveFile';
import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';
import DiskStorage from '@src/infra/providers/storage/Disk';

interface IFileContent {
  filename: string;
}

export default class File {
  static async handle(file: IFileContent) {
    if (!file) return { message: 'File is required.' };
    const diskStorageProvider = new DiskStorage();
    const transactionRepository = new PrismaTransactionRepository();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );
    await saveFileUsecase.run(file.filename);
    await insertFileDataInDatabaseUsecase.run(file.filename);
    return { message: 'File uploaded successfully' };
  }
}
