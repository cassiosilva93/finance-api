import TransactionRepository from '../../repositories/TransactionRepository';

export default class GetAllTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run() {
    const allTransactions = await this.transactionRepository.getAll();
    return allTransactions;
  }
}
