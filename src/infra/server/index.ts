import resolvers from '../graphql/resolvers';
import schemas from '../graphql/schemas';
import startApolloServer from './server';

startApolloServer(schemas, resolvers);
