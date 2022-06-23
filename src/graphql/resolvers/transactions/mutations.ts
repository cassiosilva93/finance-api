import { randomUUID } from 'crypto';
import CreateTransactionUsecase from '../../../domain/usecases/CreateTransaction';
import UpdateTransactionUsecase from '../../../domain/usecases/UpdateTransaction';
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

  updateTransaction: async (_: any, { id, data }: any) => {
    const updateTransactionUsecase = new UpdateTransactionUsecase(
      transactionRepository,
    );
    const updatedTransaction = updateTransactionUsecase.run(id, data);
    return updatedTransaction;
  },
};

export default mutations;
