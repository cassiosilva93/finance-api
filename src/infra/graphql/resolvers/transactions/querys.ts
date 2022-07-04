import Unauthorized from '@src/domain/errors/Unauthorized';
import {
  GetAllTransactionsUsecase,
  GetOneTransactionUsecase,
} from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

const transactionRepository = new PrismaTransactionRepository();

const querys = {
  getTransactions: async (_parent: any, _args: any, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
      transactionRepository,
    );
    const transactions = await getAllTransactionsUsecase.run();
    return transactions;
  },

  getTransaction: async (_: any, args: { id: string }, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const getOneTransactionUsecase = new GetOneTransactionUsecase(
      transactionRepository,
    );
    const transaction = await getOneTransactionUsecase.run(args.id);
    return transaction;
  },
};

export default querys;
