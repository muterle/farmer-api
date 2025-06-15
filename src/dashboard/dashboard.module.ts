import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardRepositoryService } from './repositories/dashboard-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepositoryService],
  exports: [DashboardService],
})
export class DashboardModule {}
