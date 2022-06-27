import fs from 'fs';

export default class ManipulateFile {
  public async changeDirectory(from: string, to: string): Promise<void> {
    await fs.promises.rename(from, to);
  }
}
