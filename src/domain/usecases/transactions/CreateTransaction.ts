import Transaction from '@src/domain/entities/Transaction';
import TransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(transaction: Transaction) {
    const newTransaction = await this.transactionRepository.create(transaction);
    return newTransaction;
  }
}
