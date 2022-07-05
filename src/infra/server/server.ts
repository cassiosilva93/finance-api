import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from '../../config';
import context from '../graphql/context';
import routes from '../rest/routes';

const app = express();
app.use(express.json());
app.use(routes);

async function startApolloServer(typeDefs: string, resolvers: any) {
  const { port, path } = config.server;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    context,
  });
  await server.start();
  server.applyMiddleware({ app, path: `/${path}` });
  app.listen(port, () => {
    console.log(`🚀 Server running in http://localhost:${port}`);
  });
}

export default startApolloServer;
