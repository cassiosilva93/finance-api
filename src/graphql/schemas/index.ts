import { mergeTypes } from 'merge-graphql-schemas';
import querys from './querys';
import mutations from './mutations';
import users from './users';

const schemas = mergeTypes([querys, mutations, users]);

export default schemas;
