import Transaction from '../entities/Transaction';

export default interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction | null>;
  getAll(): Promise<Transaction[] | []>;
}
