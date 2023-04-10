import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BucketController } from '../bucket.controller';
import { BucketService } from '../bucket.service';
import { CreateBucketInput } from '../dto/createBucket.input';
import { ParamsBucketId } from '../dto/paramsBucketId.input';
import { UpdateBucketInput } from '../dto/updateBucket.input';
import { Bucket } from '../entities/bucket.entity';
import { DeleteBucketInput } from '../dto/deleteBucket.Input';

class MockBucketRepository {
  // MockDb
  mydb = [
    {
      bucket_id: 1,
      bucket_name: '학교이미지',
      created_at: '12.12.12',
      updated_at: '12.12.12',
      deleted_at: null,
    },
  ];

  // MockingMethod-findOne
  findOne({ where: { bucket_id, bucket_name } }) {
    const bucket = this.mydb.filter(
      (el) =>
        (el.bucket_id === bucket_id || el.bucket_name === bucket_name) &&
        el.deleted_at === null,
    );
    if (bucket.length) return { ...bucket[0] };

    return null;
  }

  // MockingMethod-find
  find() {
    const newBucket = [...this.mydb];
    if (newBucket.length) return newBucket;
    return null;
  }

  // MockingMethod-save
  save(bucket_name) {
    const result1 = this.mydb.filter((el) => el.bucket_name === bucket_name);
    if (!result1) {
      this.mydb.push({
        bucket_id: this.mydb.length + 1,
        bucket_name,
        created_at: '11213123',
        updated_at: '123123123',
        deleted_at: null,
      });
    } else {
      const newDB = this.mydb.map((el) => {
        if (el.bucket_id === this.mydb.length && el.deleted_at === null) {
          el.bucket_name = bucket_name.bucket_name;
        }
        return el;
      });
      this.mydb = newDB;

      return { ...this.mydb[0] };
    }
  }

  softDelete({ bucket_id: id }) {
    const newDB = this.mydb.map((el) => {
      if (el.bucket_id === id && el.deleted_at === null) {
        el.deleted_at = Date.now();
        return el;
      }
      return el;
    });
    this.mydb = [...newDB];
    return { affected: 1, raw: {} };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BucketController', () => {
  let bucketController: BucketController;

  let bucketRepository: MockRepository<Bucket>;

  beforeEach(async () => {
    const bucketModule: TestingModule = await Test.createTestingModule({
      controllers: [BucketController],
      providers: [
        BucketService,
        {
          provide: getRepositoryToken(Bucket),
          useClass: MockBucketRepository,
        },
      ],
    }).compile();

    bucketController = bucketModule.get<BucketController>(BucketController);

    bucketRepository = bucketModule.get<MockRepository<Bucket>>(
      getRepositoryToken(Bucket),
    );
  });
  // createBucket
  describe('createBucket', () => {
    it('등록된 버킷이름이라면 confilictException', async () => {
      const bucketName = '학교이미지';
      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );
      const createBucketInput: CreateBucketInput = {
        bucket_name: bucketName,
      };
      //
      await expect(
        bucketController.createBucket(createBucketInput),
      ).rejects.toThrowError('이미 등록되었습니다.');

      expect(bucketRepositorySpyFindOne).toHaveBeenCalledWith({
        where: {
          bucket_name: bucketName,
        },
      });
      //
    });
    it('등록되어 있지 않다면 등록하고 버킷 반환', async () => {
      const bucketName = '회사이미지';

      const bucketRepositorySpySave = jest.spyOn(bucketRepository, 'save');

      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );

      const createBucketInput: CreateBucketInput = {
        bucket_name: bucketName,
      };

      const bucket = await bucketController.createBucket(createBucketInput);

      expect(bucketRepositorySpyFindOne).toHaveBeenCalledWith({
        where: {
          bucket_name: bucketName,
        },
      });
      expect(bucketRepositorySpyFindOne).toBeCalledTimes(1);
      expect(bucketRepositorySpySave).toBeCalledTimes(1);
      expect(bucket.bucket_name).toEqual(bucketName);
      //
    });
    //
  });
  // findAll
  describe('findAll', () => {
    it('findAll', async () => {
      const bucketRepositorySpyFindAll = jest.spyOn(bucketRepository, 'find');

      const buckets = await bucketController.findAll();

      expect(buckets).toStrictEqual([
        {
          bucket_id: 1,
          bucket_name: '학교이미지',
          created_at: '12.12.12',
          updated_at: '12.12.12',
          deleted_at: null,
        },
      ]);
      expect(bucketRepositorySpyFindAll).toBeCalledTimes(1);
    });
  });
  // findOneById
  describe('findOneById', () => {
    it('존재하지 않는 다면 에러발생', async () => {
      const paramsId = '2';
      const paramsBucketId: ParamsBucketId = {
        id: paramsId,
      };
      await expect(
        bucketController.findOneById(paramsBucketId),
      ).rejects.toThrowError('존재하지 않는 id입니다.');
    });
    it('존재한다면 버킷 객체 반환', async () => {
      const paramsId = '1';
      const paramsBucketId: ParamsBucketId = {
        id: paramsId,
      };
      const bucket = await bucketController.findOneById(paramsBucketId);
      expect(bucket).toStrictEqual({
        bucket_id: 1,
        bucket_name: '학교이미지',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      });
    });
  });
  // updateBucket
  describe('updateBucket', () => {
    it('버킷이 존재하지 않는다면 에러 발생', async () => {
      const bucketId = 2;
      const bucketName = 'Callisto';
      const updatedBucketInput: UpdateBucketInput = {
        bucket_id: bucketId,
        bucket_name: bucketName,
      };
      await expect(
        bucketController.updateBucket(updatedBucketInput),
      ).rejects.toThrowError(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    });
    it('버킷이 존재할 경우 업데이트 후 반환', async () => {
      const bucketId = 1;
      const bucketName = 'Callisto';
      const updatedBucketInput: UpdateBucketInput = {
        bucket_id: bucketId,
        bucket_name: bucketName,
      };
      const updatedBucket = await bucketController.updateBucket(
        updatedBucketInput,
      );

      expect(updatedBucket).toStrictEqual({
        bucket_id: 1,
        bucket_name: 'Callisto',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      });
    });
  });
  // delete
  describe('deleteBucket', () => {
    it('버킷이 존재하지 않는다면 에러 발생', async () => {
      const bucketId = 2;

      const deleteBucketInput: DeleteBucketInput = {
        bucket_id: bucketId,
      };
      await expect(
        bucketController.deleteBucket(deleteBucketInput),
      ).rejects.toThrowError(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    });
    it('버킷이 존재한다면 삭제', async () => {
      const bucketId = 1;
      const deleteBucketInput: DeleteBucketInput = {
        bucket_id: bucketId,
      };
      const isDeleted = await bucketController.deleteBucket(deleteBucketInput);
      expect(isDeleted).toBe(true);
    });
  });
});
