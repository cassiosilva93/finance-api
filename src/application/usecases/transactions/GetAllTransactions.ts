import TransactionRepository from '@src/application/repositories/Transaction';

export default class GetAllTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run() {
    const allTransactionsFound = await this.transactionRepository.getAll();
    const allTransactions = allTransactionsFound.map(t => {
      return {
        id: t.id,
        title: t.title,
        type: t.type.type,
        value: t.value.value,
        category: t.category,
        created_at: t.created_at,
        updated_at: t.updated_at,
      };
    });
    return allTransactions;
  }
}
