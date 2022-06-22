import Transaction from 'src/domain/entities/Transaction';
import TransactionRepository from 'src/domain/repository/TransactionRepository';
import prismaClient from './prismaClient';

interface ITransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default class PrismaTransactionRepository
  implements TransactionRepository
{
  async create({
    title,
    type,
    value,
    category,
  }: ITransaction): Promise<Transaction | null> {
    const transaction = await prismaClient.transactions.create({
      data: {
        title,
        type,
        value,
        category,
      },
    });

    return transaction;
  }

  async getAll(): Promise<Transaction[] | []> {
    const transactions = await prismaClient.transactions.findMany();
    return transactions;
  }
}