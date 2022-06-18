import { mergeResolvers } from 'merge-graphql-schemas';
import mutations from './mutations';
import querys from './querys';

const resolvers = mergeResolvers([
  mutations,
  querys
])

export default resolvers
