import mutations from './mutations';
import querys from './querys';

const resolvers = {
  ...mutations,
  ...querys
};

export default resolvers;
