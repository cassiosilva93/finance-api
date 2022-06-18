const users = `
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
