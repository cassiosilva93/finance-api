import GetAllTransactionsUseCase from '../../../domain/usecases/GetAllTransactions';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const querys = {
  getTransactions: async () => {
    const transactionRepository = new PrismaTransactionRepository();
    const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
      transactionRepository,
    );

    return await getAllTransactionsUseCase.run();
  },
};

export default querys;
