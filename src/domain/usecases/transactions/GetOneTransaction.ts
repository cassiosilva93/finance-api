import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class GetOneTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string) {
    const transaction = await this.transactionRepository.getOne(id);
    return transaction;
  }
}
