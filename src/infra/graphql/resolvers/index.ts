import transactionsMutations from './transactions/mutations';
import transactionsQuerys from './transactions/querys';
import usersMutations from './users/mutations';

const resolvers = {
  Query: {
    ...transactionsQuerys,
  },
  Mutation: {
    ...transactionsMutations,
    ...usersMutations,
  },
};

export default resolvers;
