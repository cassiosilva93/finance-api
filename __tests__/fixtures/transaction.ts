import { faker } from '@faker-js/faker';

const transaction = {
  type: {
    valid: {
      income: 'income',
      outcome: 'outcome',
    },
    invalid: 'other',
  },
  value: {
    valid: faker.datatype.number({ min: 1, max: 1000 }),
    invalid: faker.datatype.number({ min: -1000, max: 0 }),
  },
};

export default transaction;
