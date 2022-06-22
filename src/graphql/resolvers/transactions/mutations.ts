import { randomUUID } from 'crypto';
import CreateTransactionUsecase from '../../../domain/usecases/CreateTransaction';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const mutations = {
  createTransaction: async (_: any, { data }: any) => {
    const transactionRepository = new PrismaTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const id = randomUUID();
    const newTransaction = await createTransactionUsecase.run({ id, ...data });
    return newTransaction;
  },
};

export default mutations;
