import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // .env file Setting
    ConfigModule.forRoot({
      isGlobal: true, //
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.test',
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
