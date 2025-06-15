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

  async create(
    userId: number,
    createCultivatedCropDto: CreateCultivatedCropDto,
  ) {
    try {
      return await this.cultivatedCropRepository.save({
        ...createCultivatedCropDto,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(
    userId: number,
    query: {
      page: number;
      take: number;
      name: string;
      harvestId: number;
    },
  ) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, harvestId } = query;

      let where: any = { accountId: userId };

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

  async findOne(userId: number, id: number) {
    try {
      return await this.cultivatedCropRepository.findOne({
        where: { id: id, accountId: userId },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(
    userId: number,
    id: number,
    updateCultivatedCropDto: UpdateCultivatedCropDto,
  ) {
    try {
      return await this.cultivatedCropRepository.update(
        { id: id, accountId: userId },
        {
          ...updateCultivatedCropDto,
          harvest: { id: updateCultivatedCropDto.harvestId },
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(userId: number, id: number) {
    try {
      return await this.cultivatedCropRepository.delete({
        id: id,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
