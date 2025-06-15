import { Injectable, Logger } from '@nestjs/common';
import { returnException } from '../../shared/exceptions';
import { Harvest } from '../entities/harvest.entity';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';

@Injectable()
export class HarvestsRepositoryService {
  private readonly logger = new Logger(HarvestsRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  async create(userId: number, createHarvestDto: CreateHarvestDto) {
    try {
      return await this.harvestRepository.save({
        ...createHarvestDto,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(
    userId: number,
    query: { page: number; take: number; name: string },
  ) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name } = query;

      let where: any = { accountId: userId };

      if (name) {
        where = { ...where, name: Like(`%${name}%`) };
      }

      const [users, total] = await this.harvestRepository.findAndCount({
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
      return await this.harvestRepository.findOne({
        where: { id: id, accountId: userId },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(userId: number, id: number, updateHarvestDto: UpdateHarvestDto) {
    try {
      return await this.harvestRepository.update(
        { id: id, accountId: userId },
        {
          ...updateHarvestDto,
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(userId: number, id: number) {
    try {
      return await this.harvestRepository.delete({
        id: id,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
