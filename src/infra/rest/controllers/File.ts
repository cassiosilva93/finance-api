import BadRequest from '../../../adapter/ports/httpResponse/BadRequest';
import Created from '../../../adapter/ports/httpResponse/Created';
import ServerError from '../../../adapter/ports/httpResponse/ServerError';
import Unauthorized from '../../../adapter/ports/httpResponse/Unauthorized';
import AuthMiddleware from '../../../application/middlewares/Auth';
import {
  InsertFileDataInDatabaseUsecase,
  SaveFileUsecase,
} from '../../../application/usecases/files';
import { CreateTransactionUsecase } from '../../../application/usecases/transactions';
import config from '../../../config';
import JwtToken from '../../../infra/cryptography/JwtToken';
import PrismaTransactionRepository from '../../../infra/databases/prisma/repositories/PrismaTransaction';
import DiskStorage from '../../../infra/storage/Disk';

export default class File {
  static async handle(request: any) {
    const jwt = new JwtToken(config.jwt.secret);
    const diskStorageProvider = new DiskStorage();
    const transactionRepository = new PrismaTransactionRepository();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );
    const authMiddleware = new AuthMiddleware(jwt);
    if (!request.headers?.authorization) return new Unauthorized();
    const token = await authMiddleware.validate({ headers: request.headers });
    if (token instanceof Error || !token) return new Unauthorized();
    if (!request.file) return new BadRequest('file is required');
    const { filename, originalname } = request.file;
    const saveFileResult = await saveFileUsecase.run(filename);
    if (saveFileResult instanceof Error) return new ServerError();
    const insertFileResult = await insertFileDataInDatabaseUsecase.run(
      filename,
      token.id,
    );
    if (insertFileResult instanceof Error) return new ServerError();
    return new Created({ message: `${originalname} updated successfully` });
  }
}
