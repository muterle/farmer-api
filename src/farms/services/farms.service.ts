import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { FarmsRepositoryService } from '../repositories/farms-repository.service';
import { returnException } from '../../shared/exceptions';

@Injectable()
export class FarmsService {
  private readonly logger = new Logger(FarmsService.name, {
    timestamp: true,
  });

  constructor(private readonly farmerRepository: FarmsRepositoryService) {}

  async create(createFarmDto: CreateFarmDto) {
    try {
      if (
        Number(createFarmDto.arableArea) +
          Number(createFarmDto.vegetationArea) >
        Number(createFarmDto.totalArea)
      ) {
        returnException(
          'Arable area and vegetation area cannot be greater than total area',
          this.logger,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return await this.farmerRepository.create(createFarmDto);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: {
    page: number;
    take: number;
    name: string;
    farmerId: number;
  }) {
    try {
      return await this.farmerRepository.findAll(query);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.farmerRepository.findOne(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    try {
      if (
        Number(updateFarmDto.arableArea) +
          Number(updateFarmDto.vegetationArea) >
        Number(updateFarmDto.totalArea)
      ) {
        returnException(
          'Arable area and vegetation area cannot be greater than total area',
          this.logger,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return await this.farmerRepository.update(id, updateFarmDto);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.farmerRepository.remove(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
