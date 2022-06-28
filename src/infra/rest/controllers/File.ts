import DiskStorage from '@src/adapter/Disk';
import { IHttpRequest } from '@src/adapter/ports/HttpRequest';
import {
  InsertFileDataInDatabaseUsecase,
  SaveFileUsecase,
} from '@src/domain/usecases/files';
import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

export default class File {
  static async handle(request: IHttpRequest) {
    if (!request.file) return { message: 'File is required.' };
    const { filename } = request.file;
    const diskStorageProvider = new DiskStorage();
    const transactionRepository = new PrismaTransactionRepository();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );
    await saveFileUsecase.run(filename);
    const message = await insertFileDataInDatabaseUsecase.run(filename);
    return { message };
  }
}
