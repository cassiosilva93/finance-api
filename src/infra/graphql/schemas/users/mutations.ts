import { gql } from 'apollo-server-express';

const mutations = gql`
  type Mutation {
    createUser(data: UserInput!): User!
  }
`;

export default mutations;
