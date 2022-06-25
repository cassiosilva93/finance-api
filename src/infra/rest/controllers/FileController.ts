import SaveFile from '@src/domain/usecases/SaveFile';
import DiskStorageProvider from '@src/infra/providers/storage/Disk';
import { Request, Response } from 'express';

export class FileController {
  static async save(req: Request, res: Response) {
    if (!req.file) return;
    const deskStorageProvider = new DiskStorageProvider();
    const saveFile = new SaveFile(deskStorageProvider);
    const result = await saveFile.run(req.file?.filename);
    return res.json({ file: result });
  }
}
