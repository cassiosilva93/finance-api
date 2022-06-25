import uploadConfig from '@src/config/upload';
import fs from 'fs';
import path from 'path';
import Storage from '../models/Storage';

class DiskStorageProvider implements Storage {
  public async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, filename),
      path.resolve(uploadConfig.uploadsFolder, filename),
    );
    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, filename);
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
