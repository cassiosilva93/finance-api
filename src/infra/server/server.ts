import config from '@src/config';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import context from '../graphql/context';
import routes from '../rest/routes';

const app = express();
app.use(express.json());
app.use(routes);

app.get('/health', (_, res) => res.send({ message: 'ok' }));

async function startApolloServer(typeDefs: string, resolvers: any) {
  const { port, path } = config.server;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
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
