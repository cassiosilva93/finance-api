import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/domain/repositories/Transaction';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: TransactionEntity) {
    const transaction = await this.transactionRepository.update(id, data);
    return transaction;
  }
}
