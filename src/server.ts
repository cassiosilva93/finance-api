
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import environmentVariables from './config/environment-variables';
import schemas from './schemas';
import resolvers from './resolvers'
import { buildSchema } from 'graphql';

const app = express();
app.use(express.json())

app.use(
  environmentVariables.graphqlPath,
  graphqlHTTP((request, response) => ({
    schema: buildSchema(schemas),
    rootValue: resolvers,
    graphiql: true,
    context: {
      request,
      response,
    }
  })),
);

app.listen(environmentVariables.port, () =>
  console.log(
    `🚀 GraphQL API server running at http://localhost:${environmentVariables.port}/graphql`,
  ),
);
