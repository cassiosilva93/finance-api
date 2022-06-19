import { gql } from 'apollo-server-express'

const users = gql`
  input UserInput {
    email: String!
    name: String!
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }
`

export default users
