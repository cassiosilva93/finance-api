import TransactionRepository from '../../../application/repositories/Transaction';

export default class GetOneTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string) {
    const transactionFound = await this.transactionRepository.getOne(id);
    if (!transactionFound) return null;
    const transaction = {
      id: transactionFound.id,
      title: transactionFound.title,
      type: transactionFound.type.type,
      value: transactionFound.value.value,
      category: transactionFound.category,
      created_at: transactionFound.created_at,
      updated_at: transactionFound.updated_at,
    };
    return transaction;
  }
}
