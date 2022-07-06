import config from '@src/config';
import fs from 'fs';
import path from 'path';
import StorageAdapter from '../../adapter/ports/Storage';

export default class Disk implements StorageAdapter {
  public async saveFile(filename: string): Promise<boolean | Error> {
    try {
      await fs.promises.rename(
        path.resolve(config.upload.tempFolder, filename),
        path.resolve(config.upload.uploadsFolder, filename),
      );
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFile(filename: string): Promise<boolean> {
    try {
      const filePath = path.resolve(config.upload.uploadsFolder, filename);
      await fs.promises.unlink(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}
