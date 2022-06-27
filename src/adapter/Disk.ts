import config from '@src/config';
import fs from 'fs';
import path from 'path';
import StorageAdapter from './ports/Storage';

export default class Disk implements StorageAdapter {
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
