import { Repository } from 'typeorm';
import { BucketService } from '../bucket.service';
import { Bucket } from '../entities/bucket.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

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
    if (result1.length === 0) {
      // 존재하지 않을 경우 create
      this.mydb.push({
        bucket_id: this.mydb.length + 1,
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
        ...bucket_name,
      });
      return this.mydb[this.mydb.length - 1];
    } else {
      // 존재할경우 update
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

describe('bucketService', () => {
  let bucketService: BucketService;
  let bucketRepository: MockRepository<Bucket>;

  beforeEach(async () => {
    const bucketModule: TestingModule = await Test.createTestingModule({
      providers: [
        BucketService,
        {
          provide: getRepositoryToken(Bucket),
          useClass: MockBucketRepository,
        },
      ],
    }).compile();

    bucketService = bucketModule.get<BucketService>(BucketService);
    bucketRepository = bucketModule.get<MockRepository<Bucket>>(
      getRepositoryToken(Bucket),
    );
  });

  describe('findOneById', () => {
    it('존재하는 버킷 검증', async () => {
      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );
      const [myData] = await bucketService.findAll();
      const result = await bucketService.findOneById(myData.bucket_id);
      expect(result).toStrictEqual(myData);
      expect(bucketRepositorySpyFindOne).toBeCalledTimes(1);
    });

    it('존재하지 않는 버킷 검증', async () => {
      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );
      const myData = {
        bucket_id: 123456,
        bucket_name: '존재하지 않는 버킷 이름',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      };
      const result = await bucketService.findOneById(myData.bucket_id);
      expect(result).toBeNull();
      expect(bucketRepositorySpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('존재하는 버킷 검증', async () => {
      //
      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );
      const myData = {
        bucket_id: 1,
        bucket_name: '학교이미지',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      };
      const result = await bucketService.findOneById(myData.bucket_id);
      expect(result).toStrictEqual(myData);
      expect(bucketRepositorySpyFindOne).toBeCalledTimes(1);
    });
    it('존재하지 않는 버킷 검증', async () => {
      //
      const bucketRepositorySpyFindOne = jest.spyOn(
        bucketRepository,
        'findOne',
      );
      const myData = {
        bucket_id: 2,
        bucket_name: '학교이미지',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      };

      const result = await bucketService.findOneById(myData.bucket_id);
      expect(result).toBe(null);
      expect(bucketRepositorySpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('전체조회 검증', async () => {
      const bucketRepositorySpyFind = jest.spyOn(bucketRepository, 'find');
      const myData = [
        {
          bucket_id: 1,
          bucket_name: '학교이미지',
          created_at: '12.12.12',
          updated_at: '12.12.12',
          deleted_at: null,
        },
      ];
      const result = await bucketService.findAll();
      expect(result).toStrictEqual(myData);
      expect(bucketRepositorySpyFind).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('새로운 버킷 추가하기', async () => {
      const bucketRepositorySpySave = jest.spyOn(bucketRepository, 'save');

      const myNewData = {
        bucket_name: '내버킷이다',
      };
      const result2 = await bucketService.create(myNewData.bucket_name);
      expect(bucketRepositorySpySave).toBeCalledTimes(1);
      expect(result2).toEqual({
        bucket_id: 2,
        bucket_name: '내버킷이다',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      });
    });
  });

  describe('update', () => {
    it('수정된 버킷 검증', async () => {
      const bucketRepositorySpySave = jest.spyOn(bucketRepository, 'save');

      const bucket = new Bucket();
      bucket.bucket_id = 1;
      bucket.bucket_name = 'sfddsfs';
      const newBucketName = '집이미지';

      const updatedBucket = await bucketService.update(bucket, newBucketName);
      expect(updatedBucket.bucket_name).toEqual(newBucketName);
      expect(bucketRepositorySpySave).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('소프트 삭제 확인', async () => {
      const bucketRepositorySpySoftDelete = jest.spyOn(
        bucketRepository,
        'softDelete',
      );
      const myData = {
        bucket_id: 1,
        bucket_name: '로로로롤',
        created_at: '12.12.12',
        updated_at: '12.12.12',
        deleted_at: null,
      };
      const deleteBucket = await bucketService.delete(myData.bucket_id);
      expect(bucketRepositorySpySoftDelete).toBeCalledTimes(1);
      expect(deleteBucket).toEqual(true);
    });
  });
});
