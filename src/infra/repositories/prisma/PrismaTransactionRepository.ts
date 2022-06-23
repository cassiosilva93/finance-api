import Transaction from 'src/domain/entities/Transaction';
import TransactionRepository from 'src/domain/repositories/TransactionRepository';
import prismaClient from './prismaClient';

export default class PrismaTransactionRepository
  implements TransactionRepository
{
  async create({
    id,
    title,
    type,
    value,
    category,
    created_at,
    updated_at,
  }: Transaction): Promise<Transaction | null> {
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

  async getAll(): Promise<Transaction[] | []> {
    const transactions = await prismaClient.transactions.findMany();
    return transactions;
  }
}
