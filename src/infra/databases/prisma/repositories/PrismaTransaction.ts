import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/domain/repositories/Transaction';
import prismaClient from '../prismaClient';

export default class PrismaTransaction implements TransactionRepository {
  async create({
    id,
    title,
    type,
    value,
    category,
    created_at,
    updated_at,
  }: TransactionEntity): Promise<TransactionEntity | null> {
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
    return transaction;
  }

  async getAll(): Promise<TransactionEntity[] | []> {
    const transactions = await prismaClient.transactions.findMany();
    return transactions;
  }

  async getOne(id: string): Promise<TransactionEntity | null> {
    const transaction = await prismaClient.transactions.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  }

  async update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null> {
    const transaction = await prismaClient.transactions.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

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
