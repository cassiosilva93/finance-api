import {
  GetAllTransactionsUsecase,
  GetOneTransactionUsecase,
} from '@src/application/usecases/transactions';
import GetConsolidatedValues from '@src/application/usecases/transactions/GetConsolidatedValues';
import Unauthorized from '@src/domain/errors/Unauthorized';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';

const transactionRepository = new PrismaTransactionRepository();

const querys = {
  getTransactions: async (_parent: any, _args: any, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const userId = context.token.id;
    const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
      transactionRepository,
    );
    const transactions = await getAllTransactionsUsecase.run(userId);
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

  getConsolidedValues: async (_: any, args: { id: string }, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const getConsolidedValuesUsecase = new GetConsolidatedValues(
      transactionRepository,
    );
    const consolidedValues = getConsolidedValuesUsecase.run(args.id);
    return consolidedValues;
  },
};

export default querys;
