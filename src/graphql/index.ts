import { makeExecutableSchema } from 'graphql-tools'

import schemas from './schemas'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolvers
})

export default schema
