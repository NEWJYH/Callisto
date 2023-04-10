import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClass } from './entities/userClass.entity';

@Injectable()
export class UserClassService {
  //
  constructor(
    @InjectRepository(UserClass)
    private readonly userClassRepository: Repository<UserClass>, //
  ) {}
  //
  async userClassExists(userClassName: string): Promise<boolean> {
    const userClass = await this.userClassRepository.findOne({
      where: { user_class_name: userClassName },
    });

    return !!userClass;
  }
  //
  async create(userClassName: string): Promise<UserClass> {
    const userClass = new UserClass();
    userClass.user_class_name = userClassName;
    return await this.userClassRepository.save(userClass);
  }
  //
  async findAll(): Promise<UserClass[]> {
    return await this.userClassRepository.find();
  }
  //
  async findOneById(id: number): Promise<UserClass> {
    const userClass = await this.userClassRepository.findOne({
      where: { user_class_id: id },
    });
    return userClass;
  }
  //
  async update(
    checkUserClass: UserClass,
    userClassName: string,
  ): Promise<UserClass> {
    const userClass = await this.userClassRepository.save({
      ...checkUserClass,
      user_class_name: userClassName,
    });
    return userClass;
  }
  //
  async delete(id: number): Promise<boolean> {
    const result = await this.userClassRepository.softDelete({
      user_class_id: id,
    });
    return result.affected ? true : false;
  }
}
