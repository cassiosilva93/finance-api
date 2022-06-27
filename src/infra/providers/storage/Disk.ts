import config from '@src/config';
import fs from 'fs';
import path from 'path';
import StorageModel from '../models/Storage';

class Disk implements StorageModel {
  public async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(config.upload.tempFolder, filename),
      path.resolve(config.upload.uploadsFolder, filename),
    );
    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(config.upload.uploadsFolder, filename);
    await fs.promises.unlink(filePath);
  }
}

export default Disk;
