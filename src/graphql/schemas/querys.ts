import { gql } from 'apollo-server-express'

const querys = gql`
  type Query {
    getUser(id: String): User
    getUsers: [User]
  }
`

export default querys
