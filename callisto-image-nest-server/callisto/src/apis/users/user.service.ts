import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { UserClass } from '../userClass/entities/userClass.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  //
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  //
  async userExists(hashedEmail: string) {
    const user = await this.userRepository.findOne({
      where: { email: hashedEmail },
    });
    console.log('user', user);
    return !!user;
  }

  async create(
    hashedEmail: string,
    hashedPassword: string,
    userClass: UserClass,
  ) {
    // // TODO : Transaction - ACID 필요
    // const newProfile = new Profile();
    // newProfile.nick_name = '';
    // newProfile.user_class_id = userClass.user_class_id;
    // const profile = await this.profileRepository.save(newProfile);

    // const newUser = new User();
    // newUser.email = hashedEmail;
    // newUser.password = hashedPassword;
    // newUser.profile_id = profile.profile_id;

    // return await this.userRepository.save(newUser);
    // Transaction 시작
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const newProfile = new Profile();
        newProfile.nick_name = '';
        newProfile.user_class_id = userClass.user_class_id;
        const profile = await transactionalEntityManager.save(newProfile);

        const newUser = new User();
        newUser.email = hashedEmail;
        newUser.password = hashedPassword;
        newUser.profile = profile;

        return transactionalEntityManager.save(newUser);
      },
    );
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }
}
