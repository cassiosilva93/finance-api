import uploadConfig from '@src/config/upload';
import fs from 'fs';
import path from 'path';
import StorageModel from '../models/Storage';

class Disk implements StorageModel {
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

export default Disk;
