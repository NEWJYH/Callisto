import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { JobService } from '../job.service';
import { getRepositoryToken } from '@nestjs/typeorm';

class MockJobRepository {
  myDb = [
    {
      job_id: 1,
      job_name: '변호사',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    },
  ];

  // MockingMethod-findOne
  findOne({ where: { job_id, job_name } }) {
    const job = this.myDb.filter(
      (el) =>
        (el.job_id === job_id || el.job_name === job_name) &&
        el.deleted_at === null,
    );

    if (job.length) return { ...job[0] };
    return null;
  }
  // MockingMethod-find
  find() {
    const newJob = this.myDb.filter((el) => el.deleted_at === null);
    if (newJob.length) return newJob;
    return [];
  }

  // MockingMethod-save
  save({ job_name }) {
    const result = this.myDb.filter((el) => el.job_name === job_name);
    if (result.length === 0) {
      this.myDb.push({
        job_id: this.myDb.length + 1,
        job_name: job_name,
        created_at: Date.now(),
        updated_at: Date.now(),
        deleted_at: null,
      });
      return { ...this.myDb[this.myDb.length - 1] };
    } else {
      const newDB = this.myDb.map((el) => {
        if (el.job_name === job_name && el.deleted_at === null) {
          el.job_name = job_name;
          el.updated_at = Date.now();
        }
        return el;
      });
      this.myDb = [...newDB];

      const job = this.myDb.filter(
        (el) => el.job_name === job_name && el.deleted_at === null,
      );

      if (job.length) return { ...job[0] };
    }
  }
  // MockingMethod- softDelete
  softDelete({ job_id: id }) {
    const newDB = this.myDb.map((el) => {
      if (el.job_id === id && el.deleted_at === null) {
        el.deleted_at = Date.now();
      }
      return el;
    });
    if (newDB.length === 0) {
      return { affected: 0, raw: {} };
    }
    this.myDb = [...newDB];
    return { affected: 1, raw: {} };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('JobService', () => {
  let jobService: JobService;
  let jobRepository: MockRepository<Job>;

  beforeEach(async () => {
    const jobModule: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: MockJobRepository,
        },
      ],
    }).compile();

    jobService = jobModule.get<JobService>(JobService);
    jobRepository = jobModule.get<MockRepository<Job>>(getRepositoryToken(Job));
  });
  //

  describe('jobExists', () => {
    it('존재하는 job_name 검증', async () => {
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');

      const [jobs] = await jobService.findAll();

      const result = await jobService.jobExists(jobs.job_name);
      // 존재하면 true를 반환
      expect(result).toBe(true);
      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
    });
    it('존재하지 않는 job_name 검증', async () => {
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');
      const jobName = 'Callisto';

      const result = await jobService.jobExists(jobName);
      // 존재하지 않기 때문에 false  반환
      expect(result).toBe(false);
      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
    });
  });
  //
  describe('create', () => {
    it('job_name으로 생성', async () => {
      const jobRepositorySpySave = jest.spyOn(jobRepository, 'save');
      const jobName = 'Callisto';

      const job = await jobService.create(jobName);
      expect(job.job_name).toBe(jobName);
      expect(jobRepositorySpySave).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('초기값만 가져오기', async () => {
      const jobRepositorySpyFind = jest.spyOn(jobRepository, 'find');
      const jobs = await jobService.findAll();
      expect(jobs[0].job_id).toStrictEqual(1);
      expect(jobRepositorySpyFind).toBeCalledTimes(1);
    });
    it('create 후 가져오기', async () => {
      const jobRepositorySpySave = jest.spyOn(jobRepository, 'save');
      const jobRepositorySpyFind = jest.spyOn(jobRepository, 'find');
      const jobName = 'Callisto';
      const job = await jobService.create(jobName);
      expect(job.job_name).toBe(jobName);
      expect(jobRepositorySpySave).toBeCalledTimes(1);
      const jobs = await jobService.findAll();
      expect(jobs.length).toBe(2);
      expect(jobs[0].job_id).toStrictEqual(1);
      expect(jobs[1].job_id).toBe(2);
      expect(jobs[1].job_name).toStrictEqual(jobName);
      expect(jobRepositorySpyFind).toBeCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('job id로 찾기', async () => {
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');
      const jobId = 1;
      const job = await jobService.findOneById(jobId);
      expect(job.job_name).toBe('변호사');
      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('JobEntity객체와 jobName string으로 업데이트', async () => {
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');
      const jobRepositorySpySave = jest.spyOn(jobRepository, 'save');
      const jobId = 1;
      // job 객체 받기
      const job = await jobService.findOneById(jobId);
      expect(job.job_name).toBe('변호사');
      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
      const newName = '변리사';
      const updatedJob = await jobService.update(job, newName);
      expect(updatedJob.job_name).toBe(newName);
      expect(jobRepositorySpySave).toBeCalledTimes(1);
      expect(job.updated_at).not.toEqual(updatedJob.updated_at);
    });
  });

  describe('delete', () => {
    it('id값으로 소프트 딜리트하기', async () => {
      const jobId = 1;
      // job 객체 받기
      const job = await jobService.findOneById(jobId);
      // 존재하기 때문에 true 반환
      const result = await jobService.delete(job.job_id);
      expect(result).toBe(true);
      // 삭제 확인
      const result2 = await jobService.findAll();
      expect(result2.length).toBe(0);
    });
  });
});
