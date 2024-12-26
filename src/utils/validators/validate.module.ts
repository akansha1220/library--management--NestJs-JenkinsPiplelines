import { Module } from '@nestjs/common';
import { UserExistsValidator } from './user_exist.validator';
import { UserModule } from 'src/User/users.module';

@Module({
    imports:[UserModule],
    providers: [UserExistsValidator],
    
})
export class UserValidateModule {}