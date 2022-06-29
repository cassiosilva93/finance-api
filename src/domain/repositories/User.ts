import UserEntity from '../entities/User';

export default interface User {
  create(user: UserEntity): Promise<UserEntity | null>;
}
