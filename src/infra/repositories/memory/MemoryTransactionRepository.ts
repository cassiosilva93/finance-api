import Transaction from 'src/domain/entities/Transaction';
import TransactionRepository from 'src/domain/repositories/TransactionRepository';
import transactionFixture from '../../../../__tests__/fixtures/transaction';

export default class MemoryTransactionRepository
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
    const transaction = {
      id,
      title,
      type,
      value,
      category,
      created_at,
      updated_at,
    };

    return transaction;
  }

  async getAll(): Promise<Transaction[] | []> {
    const transactions = [transactionFixture];

    return transactions;
  }
}
