import { randomUUID } from 'crypto';
import CreateTransactionUsecase from '../../../domain/usecases/CreateTransaction';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const mutations = {
  createTransaction: async (_: any, { data }: any) => {
    const transactionRepository = new PrismaTransactionRepository();
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
};

export default mutations;
