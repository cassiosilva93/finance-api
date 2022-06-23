import Transaction from '../../entities/Transaction';
import TransactionRepository from '../../repositories/TransactionRepository';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: Transaction) {
    const transaction = await this.transactionRepository.update(id, data);
    return transaction;
  }
}
