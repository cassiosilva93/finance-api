import TransactionRepository from '../../../../application/repositories/Transaction';
import TransactionEntity from '../../../../domain/entities/Transaction';
import TransactionTypeEntity from '../../../../domain/entities/TransactionType';
import TransactionValueEntity from '../../../../domain/entities/TransactionValue';
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
    user_id: string,
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
        user_id,
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
      transaction.user_id as string,
    );
  }

  async getAll(userId: string): Promise<TransactionEntity[] | []> {
    const transactionsFound = await prismaClient.transactions.findMany({
      where: {
        user_id: userId,
      },
    });
    const transactions = transactionsFound.map((t: any) => {
      return {
        id: t.id,
        title: t.title,
        type: new TransactionTypeEntity(t.type),
        value: new TransactionValueEntity(t.value),
        category: t.category,
        created_at: t.created_at,
        updated_at: t.updated_at,
        user_id: t.user_id as string,
      };
    });
    return transactions;
  }

  async getOne(id: string): Promise<TransactionEntity | null> {
    const transactionFound = await prismaClient.transactions.findUnique({
      where: {
        id,
      },
    });
    if (!transactionFound) return null;
    const transaction = {
      id: transactionFound.id,
      title: transactionFound.title,
      type: new TransactionTypeEntity(transactionFound.type),
      value: new TransactionValueEntity(transactionFound.value),
      category: transactionFound.category,
      created_at: transactionFound.created_at,
      updated_at: transactionFound.updated_at,
      user_id: transactionFound.user_id as string,
    };
    return transaction;
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
      transactionUpdated?.user_id as string,
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

  async getConsolidedValues(userId: string): Promise<{
    totalIncome: number;
    totalOutcome: number;
    totalTransactionRegister: number;
    lastTransactionRegistered: Date;
  } | null> {
    const totalIncomeAndOutcome = await prismaClient.transactions.groupBy({
      by: ['type'],
      _sum: {
        value: true,
      },
      where: {
        user_id: userId,
      },
    });

    const totalTransactionsRegistered =
      await prismaClient.transactions.aggregate({
        _count: {
          value: true,
        },
      });

    const lastTransactionRegistered = await prismaClient.transactions.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    const totalIncome = totalIncomeAndOutcome.filter(
      transaction => transaction.type === 'income',
    );
    const totalOutcome = totalIncomeAndOutcome.filter(
      transaction => transaction.type === 'outcome',
    );

    return {
      totalIncome: totalIncome[0]?._sum.value as number,
      totalOutcome: totalOutcome[0]?._sum.value as number,
      totalTransactionRegister: totalTransactionsRegistered?._count.value,
      lastTransactionRegistered: lastTransactionRegistered[0]
        ?.created_at as Date,
    };
  }
}
