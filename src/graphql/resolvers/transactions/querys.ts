import GetAllTransactionsUseCase from '../../../domain/usecases/GetAllTransactions';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const querys = {
  getTransactions: async () => {
    const transactionRepository = new PrismaTransactionRepository();
    const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
      transactionRepository,
    );
    const transactions = await getAllTransactionsUseCase.run();
    return transactions;
  },
};

export default querys;
