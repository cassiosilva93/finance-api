import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

export default class DeleteTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string) {
    const result = await this.transactionRepository.delete(id);
    return result;
  }
}
