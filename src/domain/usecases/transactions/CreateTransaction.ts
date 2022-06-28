import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/domain/repositories/Transaction';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(transaction: TransactionEntity) {
    const newTransaction = await this.transactionRepository.create(transaction);
    return newTransaction;
  }
}
