import Transaction from '../entities/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(transaction: Transaction) {
    const newTransaction = await this.transactionRepository.create(transaction);
    return newTransaction;
  }
}
