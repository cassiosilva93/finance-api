import mutations from './mutations';
import querys from './querys';

const resolvers = {
  Query: {
    ...querys
  },
  Mutation: {
    ...mutations,
  }
}

export default resolvers
