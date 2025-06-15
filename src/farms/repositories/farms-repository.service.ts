import { Injectable, Logger } from '@nestjs/common';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Farm } from '../entities/farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { returnException } from '../../shared/exceptions';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';

@Injectable()
export class FarmsRepositoryService {
  private readonly logger = new Logger(FarmsRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(FarmCultivatedCrop)
    private readonly farmCultivatedCropRepository: Repository<FarmCultivatedCrop>,
  ) {}

  async create(createFarmDto: CreateFarmDto) {
    try {
      return await this.farmRepository.save({
        ...createFarmDto,
        farmer: { id: createFarmDto.farmerId },
      });
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
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, farmerId } = query;

      let where: any = {};

      if (name) {
        where = { ...where, name: Like(`%${name}%`) };
      }

      if (farmerId) {
        where = { ...where, farmer: { id: farmerId } };
      }

      const [users, total] = await this.farmRepository.findAndCount({
        where,
        skip: page * take,
        take,
      });

      return { total, users };
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.farmRepository.findOne({
        where: { id },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    try {
      await this.farmCultivatedCropRepository.delete({ farm: { id: id } });

      return await this.farmRepository.update(
        { id: id },
        {
          ...updateFarmDto,
          farmer: { id: updateFarmDto.farmerId },
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.farmRepository.delete({
        id,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
