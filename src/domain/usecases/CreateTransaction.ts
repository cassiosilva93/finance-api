import TransactionRepository from '../repository/TransactionRepository';

interface ITransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(transaction: ITransaction) {
    const newTransaction = await this.transactionRepository.create(transaction);
    return newTransaction;
  }
}
