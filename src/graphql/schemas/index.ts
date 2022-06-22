import { mergeTypes } from 'merge-graphql-schemas';
import transactions from './transactions';

const schemas = mergeTypes([transactions]);

export default schemas;
