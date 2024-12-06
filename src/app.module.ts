import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import {  ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService} from './database/typeorm-config.service';
import { BookModule } from './book/book.module';
import appConfig  from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    load: [
      appConfig,
      databaseConfig]
  }),
  TypeOrmModule.forRootAsync({
    useClass:TypeOrmConfigService
  }),
    UserModule,
    BookModule,
  ], 
  
})
export class AppModule {}
