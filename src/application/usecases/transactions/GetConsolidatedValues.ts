import TransactionRepository from '@src/application/repositories/Transaction';

export default class GetConsolidatedValues {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(userId: string) {
    const consolidedValues =
      await this.transactionRepository.getConsolidedValues(userId);
    return consolidedValues;
  }
}
