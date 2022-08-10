import TransactionEntity from '../../domain/entities/Transaction';

export default interface Transaction {
  create(
    id: string,
    title: string,
    type: string,
    value: number,
    category: string,
    created_at: Date,
    updated_at: Date,
    user_id: string,
  ): Promise<TransactionEntity | null>;
  getAll(userId: string): Promise<TransactionEntity[] | []>;
  getOne(id: string): Promise<TransactionEntity | null>;
  update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
  getConsolidedValues(userId: string): Promise<{
    totalIncome: number;
    totalOutcome: number;
    totalTransactionRegister: number;
    lastTransactionRegistered: Date;
  } | null>;
}
