import { Module } from '@nestjs/common';
import { FarmsService } from './services/farms.service';
import { FarmsController } from './controllers/farms.controller';
import { FarmsRepositoryService } from './repositories/farms-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { FarmCultivatedCrop } from './entities/farm-cultivated-crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, FarmCultivatedCrop])],
  controllers: [FarmsController],
  providers: [FarmsService, FarmsRepositoryService],
  exports: [FarmsService],
})
export class FarmsModule {}
