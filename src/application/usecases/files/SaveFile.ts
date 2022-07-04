import StorageAdapter from '@src/adapter/ports/Storage';

export default class SaveFile {
  constructor(private readonly storageProvider: StorageAdapter) {}

  public async run(filename: string): Promise<boolean | Error> {
    const result = await this.storageProvider.saveFile(filename);
    return result;
  }
}
