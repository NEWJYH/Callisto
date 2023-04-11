import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BucketModule } from './apis/buckets/bucket.module';
import { JobModule } from './apis/jobs/job.module';
import { ProfileModule } from './apis/profiles/profile.module';
import { UserClassModule } from './apis/userClass/userClass.module';
import { UserModule } from './apis/users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProfileModule,
    UserClassModule,
    JobModule,
    BucketModule,
    // .env file Setting
    ConfigModule.forRoot({
      isGlobal: true, //
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
    }),
    // TypeORM db Setting
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'my-database',
      port: 5432,
      username: 'UserName',
      password: 'Password',
      database: 'postgres',
      entities: [__dirname + '../**/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }), //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
