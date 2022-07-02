import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionTypeEntity from '@src/domain/entities/TransactionType';
import TransactionValueEntity from '@src/domain/entities/TransactionValue';
import TransactionRepository from '@src/domain/repositories/Transaction';
import prismaClient from '../prismaClient';

export default class PrismaTransaction implements TransactionRepository {
  async create(
    id: string,
    title: string,
    type: string,
    value: number,
    category: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<TransactionEntity | null> {
    const transaction = await prismaClient.transactions.create({
      data: {
        id,
        title,
        type,
        value,
        category,
        created_at,
        updated_at,
      },
    });
    return new TransactionEntity(
      transaction.id,
      transaction.title,
      new TransactionTypeEntity(transaction.type),
      new TransactionValueEntity(transaction.value),
      transaction.category,
      transaction.created_at,
      transaction.updated_at,
    );
  }

  async getAll(): Promise<TransactionEntity[] | []> {
    const transactions = await prismaClient.transactions.findMany();
    return transactions as any;
  }

  async getOne(id: string): Promise<TransactionEntity | null> {
    const transaction = await prismaClient.transactions.findUnique({
      where: {
        id,
      },
    });
    return transaction as any;
  }

  async update(id: string, data: any): Promise<TransactionEntity | null> {
    const transactionUpdated = await prismaClient.transactions.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    const transaction: TransactionEntity = new TransactionEntity(
      transactionUpdated?.id as string,
      transactionUpdated?.title as string,
      new TransactionTypeEntity(transactionUpdated?.type as string),
      new TransactionValueEntity(transactionUpdated?.value as number),
      transactionUpdated?.category as string,
      transactionUpdated?.created_at as Date,
      transactionUpdated?.updated_at as Date,
    );
    return transaction;
  }

  async delete(id: string): Promise<boolean> {
    const transactionFound = await prismaClient.transactions.findUnique({
      where: {
        id,
      },
    });
    if (!transactionFound) return false;
    await prismaClient.transactions.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
