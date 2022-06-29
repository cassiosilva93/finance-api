import { faker } from '@faker-js/faker';

const user = {
  email: {
    valid: faker.internet.email(),
    invalid: 'invalid@email',
    tooLarge:
      'abcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxzabcdefghijklmnopqrstuvxz@gmail.com',
  },
  password: {
    valid: '1234567890',
    invalid: '123456',
    empty: '',
  },
};

export default user;
