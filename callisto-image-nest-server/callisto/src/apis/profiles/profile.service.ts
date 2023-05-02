import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>, //
  ) {}
  //
  async findOne(profileId: string) {
    //
    return await this.profileRepository.findOne({
      where: { profile_id: profileId },
    });
  }
  //
  async update(profileId: string, nickName: string) {
    const profile = await this.profileRepository.findOne({
      where: { profile_id: profileId },
    });
    // TODO 예외처리
    profile.nick_name = nickName;
    return await this.profileRepository.save(profile);
  }
}
