import resolvers from '../resolvers';
import schemas from '../schemas';
import startApolloServer from './app';

startApolloServer(schemas, resolvers);
