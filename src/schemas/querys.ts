const querys = `
  type Query {
    getUser(id: String): User
    getUsers: [User]
  }
`

export default querys
