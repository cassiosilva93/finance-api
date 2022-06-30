import { mergeTypes } from 'merge-graphql-schemas';
import inputsAndTypes from './inputsAndTypes';
import mutations from './mutations';
import querys from './querys';

const schemas = mergeTypes([querys, mutations, inputsAndTypes]);

export default schemas;
