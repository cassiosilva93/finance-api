import { CreateUserOutputDTO } from '@src/domain/dtos/CreateUserOutput';
import { UserDTO } from '@src/domain/dtos/User';
import UserEntity from '@src/domain/entities/User';
import AlreadyExists from '@src/domain/errors/AlreadyExists';
import UserRepository from '@src/domain/repositories/User';

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async run(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<CreateUserOutputDTO | Error> {
    const userOrError = UserEntity.create(
      id,
      name,
      email,
      password,
      created_at,
      updated_at,
    );
    if (userOrError instanceof Error) return userOrError;
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) return new AlreadyExists('user');
    const user = await this.userRepository.create(
      id,
      name,
      email,
      password,
      created_at,
      updated_at,
    );
    if (!user) return new Error('create user failed');
    const userOutput: UserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return userOutput;
  }
}
