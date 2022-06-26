import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Readable } from 'stream';
import { CreateTransactionUsecase } from './transactions';

export default class InsertFileDataInDatabase {
  public async run(filename: string) {
    const transactionRepository = new PrismaTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
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

    for await (const line of transactionsLine) {
      const lineSplited = line.split(',');
      if (lineSplited.includes('title')) return;
      const transaction = {
        id: randomUUID(),
        title: lineSplited[0] || '',
        type: lineSplited[1] || '',
        value: Number(lineSplited[2]) || 0,
        category: lineSplited[3] || '',
        created_at: new Date(),
        updated_at: new Date(),
      };
      await createTransactionUsecase.run(transaction);
    }
  }
}
