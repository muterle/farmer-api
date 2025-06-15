import { Module } from '@nestjs/common';
import { HarvestsService } from './services/harvests.service';
import { HarvestsController } from './controllers/harvests.controller';
import { HarvestsRepositoryService } from './repositories/harvests-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './entities/harvest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest])],
  controllers: [HarvestsController],
  providers: [HarvestsService, HarvestsRepositoryService],
  exports: [HarvestsService],
})
export class HarvestsModule {}
