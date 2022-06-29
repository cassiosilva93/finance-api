import { mergeTypes } from 'merge-graphql-schemas';
import inputsAndTypes from './inputsAndTypes';
import mutations from './mutations';

const schemas = mergeTypes([mutations, inputsAndTypes]);

export default schemas;
