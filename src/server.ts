import startApolloServer from './app';
import resolvers from './infra/graphql/resolvers';
import schemas from './infra/graphql/schemas';

startApolloServer(schemas, resolvers);
