import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: TransactionEntity) {
    const transaction = await this.transactionRepository.update(id, data);
    return transaction;
  }
}
