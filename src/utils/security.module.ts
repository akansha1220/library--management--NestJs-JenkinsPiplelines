import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/role.guard';


@Module({
    providers: [
        {
          provide: 'APP_GUARD',
          useClass: RolesGuard,
        },
      ],
}
)
export class AppModule {}
