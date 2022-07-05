import TransactionRepository from '../../../application/repositories/Transaction';

export default class GetAllTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(userId: string) {
    const allTransactionsFound = await this.transactionRepository.getAll(
      userId,
    );
    const allTransactions = allTransactionsFound.map(t => {
      return {
        id: t.id,
        title: t.title,
        type: t.type.type,
        value: t.value.value,
        category: t.category,
        created_at: t.created_at,
        updated_at: t.updated_at,
        user_id: userId,
      };
    });
    return allTransactions;
  }
}
