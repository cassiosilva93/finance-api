import { IHttpRequest } from '@src/adapter/ports/httpRequest/HttpRequest';
import BadRequest from '@src/adapter/ports/httpResponse/BadRequest';
import Created from '@src/adapter/ports/httpResponse/Created';
import ServerError from '@src/adapter/ports/httpResponse/ServerError';
import {
  InsertFileDataInDatabaseUsecase,
  SaveFileUsecase,
} from '@src/domain/usecases/files';
import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';
import DiskStorage from '@src/infra/storage/Disk';

export default class File {
  static async handle(request: IHttpRequest) {
    const diskStorageProvider = new DiskStorage();
    const transactionRepository = new PrismaTransactionRepository();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );
    if (!request.file) return new BadRequest('file is required');
    const { filename, originalname } = request.file;
    const saveFileResult = await saveFileUsecase.run(filename);
    if (saveFileResult instanceof Error) return new ServerError();
    const insertFileResult = await insertFileDataInDatabaseUsecase.run(
      filename,
    );
    if (insertFileResult instanceof Error) return new ServerError();
    return new Created({ message: `${originalname} updated successfully` });
  }
}
