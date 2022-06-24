import TransactionRepository from '@infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class DeleteTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string) {
    const result = await this.transactionRepository.delete(id);
    return result;
  }
}
