import StorageModel from '@src/infra/providers/models/Storage';

export default class SaveFile {
  constructor(private readonly storageProvider: StorageModel) {}

  public async run(filename: string) {
    const response = await this.storageProvider.saveFile(filename);
    return response;
  }
}
