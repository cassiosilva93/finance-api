import StorageAdapter from '@src/adapter/ports/Storage';

export default class SaveFile {
  constructor(private readonly storageProvider: StorageAdapter) {}

  public async run(filename: string): Promise<void> {
    await this.storageProvider.saveFile(filename);
  }
}
