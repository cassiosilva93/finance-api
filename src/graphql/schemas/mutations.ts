import { gql } from 'apollo-server-express';

const mutations = gql`
  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: Int!, input: UserInput): User
  }
`;

export default mutations;
