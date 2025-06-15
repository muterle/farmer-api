import { Global, Module } from '@nestjs/common';
import { TenantService } from './services/tenant.service';
import { UsersRepositoryService } from '../users/repositories/users-repository.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TenantService, UsersRepositoryService],
  exports: [TenantService],
})
export class TenantModule {}
