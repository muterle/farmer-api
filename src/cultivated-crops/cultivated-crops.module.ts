import { Module } from '@nestjs/common';
import { CultivatedCropsService } from './services/cultivated-crops.service';
import { CultivatedCropsController } from './controllers/cultivated-crops.controller';
import { CultivatedCropsRepositoryService } from './repositories/cultivated-crops-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivatedCrop } from './entities/cultivated-crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivatedCrop])],
  controllers: [CultivatedCropsController],
  providers: [CultivatedCropsService, CultivatedCropsRepositoryService],
  exports: [CultivatedCropsService],
})
export class CultivatedCropsModule {}
