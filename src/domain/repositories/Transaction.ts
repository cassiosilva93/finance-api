import TransactionEntity from '../entities/Transaction';

export default interface Transaction {
  create(transaction: TransactionEntity): Promise<TransactionEntity | null>;
  getAll(): Promise<TransactionEntity[] | []>;
  getOne(id: string): Promise<TransactionEntity | null>;
  update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}
