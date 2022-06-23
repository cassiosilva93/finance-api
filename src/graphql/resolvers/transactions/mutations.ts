import { randomUUID } from 'crypto';
import Transaction from '../../../domain/entities/Transaction';
import CreateTransactionUsecase from '../../../domain/usecases/transactions/CreateTransaction';
import DeleteTransactionUsecase from '../../../domain/usecases/transactions/DeleteTransaction';
import UpdateTransactionUsecase from '../../../domain/usecases/transactions/UpdateTransaction';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const transactionRepository = new PrismaTransactionRepository();

const mutations = {
  createTransaction: async (_: any, { data }: any) => {
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const transaction = {
      id: randomUUID(),
      title: data.title,
      type: data.type,
      value: data.value,
      category: data.category,
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
