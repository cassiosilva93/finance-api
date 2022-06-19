import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';
import startApolloServer from './app';

startApolloServer(schemas, resolvers);
