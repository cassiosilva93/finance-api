import prismaClient from '../../../database/prismaClient';

const querys = {
  getTransactions: async () => {
    const transactions = await prismaClient.transactions.findMany();
    return transactions;
  },
};

export default querys;
