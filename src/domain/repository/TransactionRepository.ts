import Transaction from '../entities/Transaction';

interface ITransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default interface TransactionRepository {
  create(transaction: ITransaction): Promise<Transaction | null>;
  getAll(): Promise<Transaction[] | []>;
}
