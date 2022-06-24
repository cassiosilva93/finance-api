import { randomUUID } from 'crypto';
import Transaction from '../../../../domain/entities/Transaction';
import {
  CreateTransaction,
  DeleteTransaction,
  UpdateTransaction,
} from '../../../../domain/usecases/transactions';
import PrismaTransactionRepository from '../../../../infra/database/prisma/repositories/PrismaTransactionRepository';

const transactionRepository = new PrismaTransactionRepository();

const mutations = {
  createTransaction: async (_: any, args: { data: Transaction }) => {
    const createTransactionUsecase = new CreateTransaction(
      transactionRepository,
    );
    const transaction = {
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
    args: { id: string; data: Transaction },
  ) => {
    const updateTransactionUsecase = new UpdateTransaction(
      transactionRepository,
    );
    const updatedTransaction = updateTransactionUsecase.run(args.id, args.data);
    return updatedTransaction;
  },

  deleteTransaction: async (_: any, args: { id: string }) => {
    const deleteTransactionUsecase = new DeleteTransaction(
      transactionRepository,
    );
    const result = await deleteTransactionUsecase.run(args.id);
    return result;
  },
};

export default mutations;
