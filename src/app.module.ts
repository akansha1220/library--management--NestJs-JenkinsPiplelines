import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService} from './database/typeorm-config.service';
//import { BookModule } from './book/book.module';
import appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import { UserModule } from './User/users.module';
import { AuthenticationModule } from './auth/authentication.module';
import authConfig from './config/auth.config';
import { BookModule } from './book/book.module';

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    load: [
      appConfig,
      databaseConfig,
      authConfig,
    ]
  }),
  TypeOrmModule.forRootAsync({
    useClass:TypeOrmConfigService
  }),
    BookModule,
    UserModule,
    AuthenticationModule,
  ],
  })
export class AppModule {}
