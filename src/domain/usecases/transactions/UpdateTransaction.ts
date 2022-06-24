import Transaction from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: Transaction) {
    const transaction = await this.transactionRepository.update(id, data);
    return transaction;
  }
}
