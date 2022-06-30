import TransactionEntity from '@src/domain/entities/Transaction';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
  UpdateTransactionUsecase,
} from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';
import { randomUUID } from 'crypto';

const transactionRepository = new PrismaTransactionRepository();

const mutations = {
  createTransaction: async (_: any, args: { data: TransactionEntity }) => {
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const transaction: TransactionEntity = {
      id: randomUUID(),
      title: args.data.title,
      type: args.data.type,
      value: args.data.value,
      category: args.data.category,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const newTransaction = await createTransactionUsecase.run(transaction);
    return newTransaction;
  },

  updateTransaction: async (
    _: any,
    args: { id: string; data: TransactionEntity },
  ) => {
    const updateTransactionUsecase = new UpdateTransactionUsecase(
      transactionRepository,
    );
    const updatedTransaction = updateTransactionUsecase.run(args.id, args.data);
    return updatedTransaction;
  },

  deleteTransaction: async (_: any, args: { id: string }) => {
    const deleteTransactionUsecase = new DeleteTransactionUsecase(
      transactionRepository,
    );
    const result = await deleteTransactionUsecase.run(args.id);
    return result;
  },
};

export default mutations;
