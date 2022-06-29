import AlreadyExistsError from '../errors/AlreadyExists';
import InvalidEmailError from '../errors/InvalidEmail';
import MaxLengthEmailError from '../errors/MaxLengthEmail';
import MinLengthPasswordError from '../errors/MinLengthPassword';
import { UserDTO } from './User';

export type CreateUserOutputDTO =
  | UserDTO
  | AlreadyExistsError
  | MinLengthPasswordError
  | InvalidEmailError
  | MaxLengthEmailError;
