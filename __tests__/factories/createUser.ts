import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

interface ICreateUserParams {
  email: string;
  password: string;
}

const createUser = ({ email, password }: ICreateUserParams) => {
  const user = {
    id: randomUUID(),
    name: faker.name.findName(),
    email,
    password,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return user;
};

export default createUser;
