import Transaction from '@domain/entities/Transaction';
import TransactionRepository from '@infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(transaction: Transaction) {
    const newTransaction = await this.transactionRepository.create(transaction);
    return newTransaction;
  }
}
