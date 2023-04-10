import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  //
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>, //
  ) {}
  //
  async jobExists(job_name: string): Promise<boolean> {
    const job = await this.jobRepository.findOne({
      where: {
        job_name: job_name,
      },
    });

    return !!job;
  }
  //
  async create(job_name: string): Promise<Job> {
    const job = new Job();
    job.job_name = job_name;
    return await this.jobRepository.save(job);
  }
  //
  async findAll() {
    const jobs = await this.jobRepository.find();
    return jobs;
  }

  //
  async findOneById(id: number) {
    const job = await this.jobRepository.findOne({
      where: { job_id: id },
    });
    return job;
  }
  //
  async update(checkJob: Job, jobName: string): Promise<Job> {
    const job = await this.jobRepository.save({
      ...checkJob,
      job_name: jobName,
    });

    return job;
  }

  //
  async delete(id: number): Promise<boolean> {
    // 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.jobRepository.softDelete({
      job_id: id,
    });
    return result.affected ? true : false;
  }
}
