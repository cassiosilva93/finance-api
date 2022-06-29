import { mergeTypes } from 'merge-graphql-schemas';
import transactions from './transactions';
import users from './users';

const schemas = mergeTypes([transactions, users]);

export default schemas;
