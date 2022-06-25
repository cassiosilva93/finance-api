import Storage from '@src/infra/providers/models/Storage';

export default class SaveFile {
  constructor(private readonly storageProvider: Storage) {}

  public async run(filename: string) {
    const result = await this.storageProvider.saveFile(filename);
    return result;
  }
}
