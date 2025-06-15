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

  async create(createHarvestDto: CreateHarvestDto) {
    try {
      return await this.harvestRepository.save({
        ...createHarvestDto,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: { page: number; take: number; name: string }) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name } = query;

      let where: any = {};

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

  async findOne(id: number) {
    try {
      return await this.harvestRepository.findOne({
        where: { id },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateHarvestDto: UpdateHarvestDto) {
    try {
      return await this.harvestRepository.update(
        { id: id },
        {
          ...updateHarvestDto,
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.harvestRepository.delete({
        id,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
