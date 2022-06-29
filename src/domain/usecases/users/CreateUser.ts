import UserEntity from '@src/domain/entities/User';
import UserRepository from '@src/domain/repositories/User';

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async run(user: UserEntity) {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}
