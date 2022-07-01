import config from '@src/config';
import { ApolloServer } from 'apollo-server';
import context from '../context';

async function startApolloServer(typeDefs: string, resolvers: any) {
  const { port } = config.graphql;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    context,
  });
  const { url } = await server.listen({ port });
  console.log(`🚀 GraphQL server running in ${url}`);
}

export default startApolloServer;
