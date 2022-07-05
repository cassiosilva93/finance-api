import { randomUUID } from 'crypto';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
  UpdateTransactionUsecase,
} from '../../../../application/usecases/transactions';
import TransactionEntity from '../../../../domain/entities/Transaction';
import Unauthorized from '../../../../domain/errors/Unauthorized';
import PrismaTransactionRepository from '../../../../infra/databases/prisma/repositories/PrismaTransaction';

const transactionRepository = new PrismaTransactionRepository();

const mutations = {
  createTransaction: async (
    _: any,
    args: { data: TransactionEntity },
    context: any,
  ) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const userId = context.token.id;
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const newTransaction = await createTransactionUsecase.run(
      randomUUID(),
      args.data.title,
      String(args.data.type),
      Number(args.data.value),
      args.data.category,
      new Date(),
      new Date(),
      userId,
    );
    return newTransaction;
  },

  updateTransaction: async (
    _: any,
    args: { id: string; data: any },
    context: any,
  ) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const updateTransactionUsecase = new UpdateTransactionUsecase(
      transactionRepository,
    );
    const updatedTransaction = updateTransactionUsecase.run(args.id, args.data);
    return updatedTransaction;
  },

  deleteTransaction: async (_: any, args: { id: string }, context: any) => {
    if (context.token instanceof Unauthorized) return new Unauthorized();
    const deleteTransactionUsecase = new DeleteTransactionUsecase(
      transactionRepository,
    );
    const result = await deleteTransactionUsecase.run(args.id);
    return result;
  },
};

export default mutations;
