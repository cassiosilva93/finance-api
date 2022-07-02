import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/domain/repositories/Transaction';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(
    id: string,
    title: string,
    type: string,
    value: number,
    category: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<TransactionEntity | Error | null> {
    const transactionOrError = TransactionEntity.create(
      id,
      title,
      type,
      value,
      category,
      created_at,
      updated_at,
    );
    if (transactionOrError instanceof Error) return transactionOrError;
    const transaction = await this.transactionRepository.create(
      id,
      title,
      type,
      value,
      category,
      created_at,
      updated_at,
    );
    if (!transaction) return new Error('create transaction failed');
    return transaction;
  }
}
