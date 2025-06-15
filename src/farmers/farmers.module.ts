import { Module } from '@nestjs/common';
import { FarmersService } from './services/farmers.service';
import { FarmersController } from './controllers/farmers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { FarmersRepositoryService } from './repositories/farmers-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  controllers: [FarmersController],
  providers: [FarmersService, FarmersRepositoryService],
  exports: [FarmersService],
})
export class FarmersModule {}
