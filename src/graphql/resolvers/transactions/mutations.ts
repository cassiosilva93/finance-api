import prismaClient from '../../../database/prismaClient';

const mutations = {
  createTransaction: async (_: any, { data }: any) => {
    const transaction = await prismaClient.transactions.create({
      data: {
        ...data,
      },
    });

    return transaction;
  },
};

export default mutations;
