import GetAllTransactionsUsecase from '../../../domain/usecases/transactions/GetAllTransactions';
import GetOneTransactionUsecase from '../../../domain/usecases/transactions/GetOneTransaction';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const transactionRepository = new PrismaTransactionRepository();

const querys = {
  getTransactions: async () => {
    const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
      transactionRepository,
    );
    const transactions = await getAllTransactionsUsecase.run();
    return transactions;
  },

  getTransaction: async (_: any, args: { id: string }) => {
    const getOneTransactionUsecase = new GetOneTransactionUsecase(
      transactionRepository,
    );
    const transaction = await getOneTransactionUsecase.run(args.id);
    return transaction;
  },
};

export default querys;
