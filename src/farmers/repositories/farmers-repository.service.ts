import { Injectable, Logger } from '@nestjs/common';
import { CreateFarmerDto } from '../dto/create-farmer.dto';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';
import { Farmer } from '../entities/farmer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { returnException } from '../../shared/exceptions';
import { TenantService } from '../../tenant/services/tenant.service';

@Injectable()
export class FarmersRepositoryService {
  private readonly logger = new Logger(FarmersRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
    private readonly tenantService: TenantService,
  ) {}

  async create(userId: number, createFarmerDto: CreateFarmerDto) {
    try {
      return await this.farmerRepository.save({
        ...createFarmerDto,
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
      documentNumber: string;
      isActive: boolean;
    },
  ) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const { name, documentNumber, isActive } = query;

      let where: any = { accountId: userId };

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

  async findOne(userId: number, id: number) {
    try {
      return await this.farmerRepository.findOne({
        where: { id: id, accountId: userId },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(userId: number, id: number, updateFarmerDto: UpdateFarmerDto) {
    try {
      return await this.farmerRepository.update(
        { id: id, accountId: userId },
        {
          ...updateFarmerDto,
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(userId: number, id: number) {
    try {
      return await this.farmerRepository.delete({
        id: id,
        accountId: userId,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
