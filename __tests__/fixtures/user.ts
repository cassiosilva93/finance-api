import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

const users = [
  {
    id: randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: String(
      faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    ),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: String(
      faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    ),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: String(
      faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    ),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: String(
      faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    ),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: String(
      faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    ),
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default users;
