import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/domain/repositories/Transaction';

export default class MemoryTransaction implements TransactionRepository {
  public transactions: TransactionEntity[];

  constructor() {
    this.transactions = [];
  }

  async create({
    id,
    title,
    type,
    value,
    category,
    created_at,
    updated_at,
  }: TransactionEntity): Promise<TransactionEntity | null> {
    this.transactions.push({
      id,
      title,
      type,
      value,
      category,
      created_at,
      updated_at,
    });
    const transaction = this.transactions.find(
      transaction => transaction.id === id,
    );
    return !!transaction ? transaction : null;
  }

  async getAll(): Promise<TransactionEntity[] | []> {
    return this.transactions;
  }

  async getOne(id: string): Promise<TransactionEntity | null> {
    const transaction = this.transactions.find(
      transaction => transaction.id === id,
    );
    return !!transaction ? transaction : null;
  }

  async update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null> {
    const notFound = -1;
    const transactionFound = this.transactions.findIndex(
      transaction => transaction.id === id,
    );

    if (transactionFound === notFound) {
      return null;
    }

    const transactionChanged = {
      ...data,
    };

    this.transactions[transactionFound] = transactionChanged;
    const transaction = this.transactions.find(
      transaction => transaction.id === id,
    );
    return !!transaction ? transaction : null;
  }

  async delete(id: string): Promise<boolean> {
    const notFound = -1;
    const transactionFound = this.transactions.findIndex(
      transaction => transaction.id === id,
    );

    if (transactionFound === notFound) {
      return false;
    }

    this.transactions.splice(transactionFound, 1);
    return true;
  }
}
