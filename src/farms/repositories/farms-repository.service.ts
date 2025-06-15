import { Injectable, Logger } from '@nestjs/common';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Farm } from '../entities/farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { returnException } from '../../shared/exceptions';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';
import { TenantService } from '../../tenant/services/tenant.service';

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
    private readonly tenantService: TenantService,
  ) {}

  async create(userId: number, createFarmDto: CreateFarmDto) {
    try {
      return await this.farmRepository.save({
        ...createFarmDto,
        farmer: { id: createFarmDto.farmerId },
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
      farmerId: number;
    },
  ) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, farmerId } = query;

      let where: any = { accountId: userId };

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

  async findOne(userId: number, id: number) {
    try {
      return await this.farmRepository.findOne({
        where: { id: id, accountId: userId },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(userId: number, id: number, updateFarmDto: UpdateFarmDto) {
    try {
      await this.farmCultivatedCropRepository.delete({ farm: { id: id } });

      return await this.farmRepository.update(
        { id: id, accountId: userId },
        {
          ...updateFarmDto,
          farmer: { id: updateFarmDto.farmerId },
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(userId: number, id: number) {
    try {
      return await this.farmRepository.delete({
        id: id,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
