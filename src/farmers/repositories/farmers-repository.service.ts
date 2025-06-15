import { Injectable, Logger } from '@nestjs/common';
import { CreateFarmerDto } from '../dto/create-farmer.dto';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';
import { Farmer } from '../entities/farmer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { returnException } from '../../shared/exceptions';

@Injectable()
export class FarmersRepositoryService {
  private readonly logger = new Logger(FarmersRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
  ) {}

  async create(createFarmerDto: CreateFarmerDto) {
    try {
      return await this.farmerRepository.save({
        ...createFarmerDto,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: {
    page: number;
    take: number;
    name: string;
    documentNumber: string;
    isActive: boolean;
  }) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, documentNumber, isActive } = query;

      let where: any = {};

      if (name) {
        where = { ...where, name: Like(`%${name}%`) };
      }

      if (documentNumber) {
        where = { ...where, documentNumber: Like(`%${documentNumber}%`) };
      }

      if (isActive !== undefined) {
        where = { ...where, isActive };
      }

      const [users, total] = await this.farmerRepository.findAndCount({
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
      return await this.farmerRepository.findOne({
        where: { id },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    try {
      return await this.farmerRepository.update(
        { id: id },
        {
          ...updateFarmerDto,
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.farmerRepository.delete({
        id,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
