import DiskStorage from '@src/adapter/Disk';
import { SaveFileUsecase } from '@src/domain/usecases/files';
import fs from 'fs';
import path from 'path';
import csvFixture from './fixtures/file';
import ManipulateFile from './utils/ManipulateFile';

describe('Save File', () => {
  const manipulateFile = new ManipulateFile();
  const { toManipulate } = csvFixture.filename;

  beforeEach(async () => {
    const from = path.resolve(__dirname, '..', 'temp', 'uploads', toManipulate);
    const to = path.resolve(__dirname, '..', 'temp', toManipulate);
    await manipulateFile.changeDirectory(from, to);
  });

  it('should be able to save file in upload folder', async () => {
    // Given
    let filesFounded: String[] = [];
    const diskStorageProvider = new DiskStorage();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const filePath = path.resolve(__dirname, '..', 'temp');

    // When
    await saveFileUsecase.run('test2.csv');
    fs.readdir(filePath, (_: any, files: any) => {
      files.forEach((file: string) => {
        filesFounded.push(file);
      });
    });

    // Then
    expect(filesFounded).toHaveLength(0);
  });
});
