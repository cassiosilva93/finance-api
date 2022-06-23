import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import Transaction from '../../src/domain/entities/Transaction';

const transaction: Transaction = {
  id: randomUUID(),
  title: faker.lorem.slug(),
  type: 'income',
  value: faker.datatype.number({ min: -100000, max: 100000 }),
  category: faker.lorem.word(),
  created_at: new Date(),
  updated_at: new Date(),
};

export default transaction;
