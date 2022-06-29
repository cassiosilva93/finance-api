import UserEntity from '../entities/User';

export default interface User {
  create(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
