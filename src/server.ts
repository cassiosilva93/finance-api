import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import environmentVariables from './config/environment-variables';
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import express from "express";
import http from "http";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const { port, graphqlPath } = environmentVariables
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port }, resolve)
  );
  console.log(`🚀 GraphQL API server running at http://localhost:${port}${graphqlPath}`);
}

startApolloServer(schemas, resolvers);
