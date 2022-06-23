import Transaction from '../entities/Transaction';

export default interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction | null>;
  getAll(): Promise<Transaction[] | []>;
  getOne(id: string): Promise<Transaction | null>;
  update(id: string, data: Transaction): Promise<Transaction | null>;
  delete(id: string): Promise<boolean>;
}
