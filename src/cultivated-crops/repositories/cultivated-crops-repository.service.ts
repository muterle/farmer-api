import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnException } from '../../shared/exceptions';
import { Like, Repository } from 'typeorm';
import { CultivatedCrop } from '../entities/cultivated-crop.entity';
import { CreateCultivatedCropDto } from '../dto/create-cultivated-crop.dto';
import { UpdateCultivatedCropDto } from '../dto/update-cultivated-crop.dto';

@Injectable()
export class CultivatedCropsRepositoryService {
  private readonly logger = new Logger(CultivatedCropsRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(CultivatedCrop)
    private readonly cultivatedCropRepository: Repository<CultivatedCrop>,
  ) {}

  async create(createCultivatedCropDto: CreateCultivatedCropDto) {
    try {
      return await this.cultivatedCropRepository.save({
        ...createCultivatedCropDto,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: {
    page: number;
    take: number;
    name: string;
    harvestId: number;
  }) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, harvestId } = query;

      let where: any = {};

      if (name) {
        where = { ...where, name: Like(`%${name}%`) };
      }

      if (harvestId) {
        where = { ...where, harvest: { id: harvestId } };
      }

      const [users, total] = await this.cultivatedCropRepository.findAndCount({
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
      return await this.cultivatedCropRepository.findOne({
        where: { id },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateCultivatedCropDto: UpdateCultivatedCropDto) {
    try {
      return await this.cultivatedCropRepository.update(
        { id: id },
        {
          ...updateCultivatedCropDto,
          harvest: { id: updateCultivatedCropDto.harvestId },
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.cultivatedCropRepository.delete({
        id,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
