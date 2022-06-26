import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

export default class GetAllTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run() {
    const allTransactions = await this.transactionRepository.getAll();
    return allTransactions;
  }
}
