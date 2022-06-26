import InsertFileDataInDatabaseUsecase from '@src/domain/usecases/InsertFileDataInDatabase';
import SaveFileUsecase from '@src/domain/usecases/SaveFile';
import DiskStorage from '@src/infra/providers/storage/Disk';
import { Request, Response } from 'express';

export default class File {
  static async handle(request: Request, response: Response) {
    if (!request.file) return response.json({ message: 'File is required.' });
    const diskStorageProvider = new DiskStorage();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const insertFileDataInDatabaseUsecase =
      new InsertFileDataInDatabaseUsecase();
    await saveFileUsecase.run(request.file.filename);
    await insertFileDataInDatabaseUsecase.run(request.file.filename);
    return response.json({ message: 'File uploaded successfully' });
  }
}
