import TransactionRepository from '@src/domain/repositories/Transaction';

export default class GetOneTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string) {
    const transaction = await this.transactionRepository.getOne(id);
    return transaction;
  }
}
