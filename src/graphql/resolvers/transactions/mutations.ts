import CreateTransactionUsecase from '../../../domain/usecases/CreateTransaction';
import PrismaTransactionRepository from '../../../infra/repositories/prisma/PrismaTransactionRepository';

const mutations = {
  createTransaction: async (_: any, { data }: any) => {
    const transactionRepository = new PrismaTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );

    return await createTransactionUsecase.run(data);
  },
};

export default mutations;
