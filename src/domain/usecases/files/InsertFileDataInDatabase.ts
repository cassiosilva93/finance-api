import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Readable } from 'stream';

export default class InsertFileDataInDatabase {
  constructor(private readonly createTransactionUsecase: any) {}

  private async insertLines(lines: readline.Interface): Promise<void> {
    for await (const line of lines) {
      const lineSplited = String(line).split(',');
      const transaction = {
        id: randomUUID(),
        title: lineSplited[0] || '',
        type: lineSplited[1] || '',
        value: Number(lineSplited[2]) || 0,
        category: lineSplited[3] || '',
        created_at: new Date(),
        updated_at: new Date(),
      };
      await this.createTransactionUsecase.run(transaction);
    }
  }

  public async run(filename: string) {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'temp',
      'uploads',
      filename,
    );
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) return 'File not exists.';
    const buffer = fs.readFileSync(filePath);
    const readableLine = new Readable();
    readableLine.push(buffer);
    readableLine.push(null);
    const transactionsLine = readline.createInterface({
      input: readableLine,
    });
    await this.insertLines(transactionsLine);
    return 'File uploaded successfully.';
  }
}
