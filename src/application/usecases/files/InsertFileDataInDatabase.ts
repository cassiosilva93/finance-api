import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Readable } from 'stream';

export default class InsertFileDataInDatabase {
  constructor(private readonly createTransactionUsecase: any) {}

  private async insertLines(
    lines: readline.Interface,
    userId: string,
  ): Promise<void> {
    for await (const line of lines) {
      const lineSplited = String(line).split(',');
      const transaction = {
        id: randomUUID(),
        title: lineSplited[0],
        type: lineSplited[1],
        value: Number(lineSplited[2]),
        category: lineSplited[3],
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userId,
      };
      await this.createTransactionUsecase.run(
        transaction.id,
        transaction.title,
        transaction.type,
        transaction.value,
        transaction.category,
        transaction.created_at,
        transaction.updated_at,
        transaction.user_id,
      );
    }
  }

  public async run(filename: string, userId: string): Promise<boolean | Error> {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'temp',
        'uploads',
        filename,
      );
      const buffer = fs.readFileSync(filePath);
      const readableLine = new Readable();
      readableLine.push(buffer);
      readableLine.push(null);
      const transactionsLine = readline.createInterface({
        input: readableLine,
      });
      await this.insertLines(transactionsLine, userId);
      return true;
    } catch (error) {
      throw new Error('error inserting file information into database');
    }
  }
}
