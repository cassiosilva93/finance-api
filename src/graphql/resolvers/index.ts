import transactionsQuerys from './transactions/querys';
import transactionsMutations from './transactions/mutations';

const resolvers = {
  Query: {
    ...transactionsQuerys
  },
  Mutation: {
    ...transactionsMutations
  },
};

export default resolvers;
