import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { JobService } from '../job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobController } from '../job.controller';
import { CreateJobInput } from '../dto/createJob.input';
import { ParamsJobId } from '../dto/paramsJobId.input';
import { UpdateJobInput } from '../dto/updateJob.input';
import { DeleteJobInput } from '../dto/deleteJob.input';

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

describe('JobController', () => {
  let jobController: JobController;

  let jobRepository: MockRepository<Job>;

  beforeEach(async () => {
    const jobModule: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: MockJobRepository,
        },
      ],
    }).compile();

    jobController = jobModule.get<JobController>(JobController);
    jobRepository = jobModule.get<MockRepository<Job>>(getRepositoryToken(Job));
  });

  //
  describe('createJob', () => {
    //
    it('등록된 job이라면 ConflictException', async () => {
      const jobName = '변호사';
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');

      const createJobInput: CreateJobInput = {
        job_name: jobName,
      };

      await expect(
        jobController.createJob(createJobInput),
      ).rejects.toThrowError('이미 등록되었습니다.');

      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
    });
    //
    it('등록되어 있지 않다면 등록하고 job 반환', async () => {
      const jobName = '의사';
      const jobRepositorySpyFindOne = jest.spyOn(jobRepository, 'findOne');
      const jobRepositorySpySave = jest.spyOn(jobRepository, 'save');
      const createJobInput: CreateJobInput = {
        job_name: jobName,
      };

      const job = await jobController.createJob(createJobInput);
      expect(jobRepositorySpyFindOne).toBeCalledTimes(1);
      expect(jobRepositorySpySave).toBeCalledTimes(1);
      expect(job.job_name).toBe(jobName);
      expect(job.job_id).toBe(2);
    });
  });

  describe('findAll', () => {
    //
    it('전체 조회', async () => {
      const jobRepositorySpyFindAll = jest.spyOn(jobRepository, 'find');
      const job = await jobController.findAll();
      expect(job[0].job_name).toBe('변호사');
      expect(job.length).toBe(1);
      expect(jobRepositorySpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    //
    it('job_id가 존재하지 않는다면 UnprocessableEntityException 발생', async () => {
      //
      const paramsId = '2';
      const paramsJobId: ParamsJobId = {
        id: paramsId,
      };
      await expect(jobController.findOneById(paramsJobId)).rejects.toThrowError(
        '존재하지 않는 id입니다.',
      );
    });
    it('job_id가 존재한다면 job 객체 반환', async () => {
      //
      const paramsId = '1';
      const paramsJobId: ParamsJobId = {
        id: paramsId,
      };

      const job = await jobController.findOneById(paramsJobId);
      expect(job.job_id).toBe(1);
      expect(job.job_name).toBe('변호사');
    });
  });

  describe('updatedJob', () => {
    //
    it('job이 존재하지 않는다면 에러 발생', async () => {
      const jobId = 2;
      const jobName = 'Callisto';
      const updateJobInput: UpdateJobInput = {
        job_id: jobId,
        job_name: jobName,
      };

      await expect(
        jobController.updateJob(updateJobInput),
      ).rejects.toThrowError(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    });
    //
    it('job이 존재할 경우 업데이트 후 반환', async () => {
      const jobId = 1;
      const jobName = 'Callisto';
      const updateJobInput: UpdateJobInput = {
        job_id: jobId,
        job_name: jobName,
      };

      const updatedJob = await jobController.updateJob(updateJobInput);
      expect(updatedJob.job_name).toEqual(jobName);
    });
  });

  describe('deleteJob', () => {
    //
    it('job_id가 존재하지 않는다면 에러 발생', async () => {
      const jobId = 2;
      const deleteJobInput: DeleteJobInput = {
        job_id: jobId,
      };
      await expect(
        jobController.deleteJob(deleteJobInput),
      ).rejects.toThrowError(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    });
    it('job_id가 존재한다면 삭제', async () => {
      const jobId = 1;
      const deleteJobInput: DeleteJobInput = {
        job_id: jobId,
      };

      const isDeleted = await jobController.deleteJob(deleteJobInput);
      expect(isDeleted).toEqual(true);
    });
  });
});
