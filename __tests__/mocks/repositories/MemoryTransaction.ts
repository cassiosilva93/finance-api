import TransactionRepository from '@src/application/repositories/Transaction';
import TransactionEntity from '@src/domain/entities/Transaction';
import { default as TransactionTypeEntity } from '@src/domain/entities/TransactionType';
import { default as TransactionValueEntity } from '@src/domain/entities/TransactionValue';

export default class MemoryTransaction implements TransactionRepository {
  public transactions: TransactionEntity[];

  constructor() {
    this.transactions = [];
  }

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
    const newTransaction = new TransactionEntity(
      id,
      title,
      new TransactionTypeEntity(type),
      new TransactionValueEntity(value),
      category,
      created_at,
      updated_at,
      user_id,
    );

    this.transactions.push({
      id: newTransaction.id,
      title: newTransaction.title,
      type: newTransaction.type,
      value: newTransaction.value,
      category: newTransaction.category,
      created_at: newTransaction.created_at,
      updated_at: newTransaction.updated_at,
      user_id: newTransaction.user_id,
    });

    const transaction = this.transactions.find(t => t.id === id);
    return transaction || null;
  }

  async getAll(userId: string): Promise<TransactionEntity[] | []> {
    const transactions = this.transactions.filter(t => t.user_id === userId);
    return transactions;
  }

  async getOne(id: string): Promise<TransactionEntity | null> {
    const transaction = this.transactions.find(t => t.id === id);
    return transaction || null;
  }

  async update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null> {
    const notFound = -1;
    const transactionFound = this.transactions.findIndex(t => t.id === id);

    if (transactionFound === notFound) {
      return null;
    }

    const transactionChanged = {
      ...data,
    };

    this.transactions[transactionFound] = transactionChanged;
    const transaction = this.transactions.find(t => t.id === id);
    return transaction || null;
  }

  async delete(id: string): Promise<boolean> {
    const notFound = -1;
    const transactionFound = this.transactions.findIndex(t => t.id === id);

    if (transactionFound === notFound) {
      return false;
    }

    this.transactions.splice(transactionFound, 1);
    return true;
  }

  async getConsolidedValues(userId: string): Promise<{
    totalIncome: number;
    totalOutcome: number;
    totalTransactionRegister: number;
    lastTransactionRegistered: Date;
  } | null> {
    if (!this.transactions.length) return null;

    const totalIncome = this.transactions
      .filter(t => t.user_id === userId && t.type.type === 'income')
      .map(t => t.value.value)
      .reduce((previous: number, current: number) => previous + current, 0);

    const totalOutcome = this.transactions
      .filter(t => t.user_id === userId && t.type.type === 'outcome')
      .map(t => t.value.value)
      .reduce((previous: number, current: number) => previous + current, 0);

    const totalTransactionRegister = this.transactions.filter(
      t => t.user_id === userId,
    ).length;

    const lastTransactionRegistered = this.transactions
      .map(t => t.created_at)
      .reduce((previous: Date, current: Date) =>
        previous > current ? previous : current,
      );

    return {
      totalIncome,
      totalOutcome,
      totalTransactionRegister,
      lastTransactionRegistered,
    };
  }
}
