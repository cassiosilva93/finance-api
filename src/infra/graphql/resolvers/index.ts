import transactionsMutations from './transactions/mutations';
import transactionsQuerys from './transactions/querys';
import usersMutations from './users/mutations';
import usersQuerys from './users/querys';

const resolvers = {
  Query: {
    ...transactionsQuerys,
    ...usersQuerys,
  },
  Mutation: {
    ...transactionsMutations,
    ...usersMutations,
  },
};

export default resolvers;
