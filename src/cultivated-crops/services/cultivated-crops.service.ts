import { Injectable, Logger } from '@nestjs/common';
import { CreateCultivatedCropDto } from '../dto/create-cultivated-crop.dto';
import { UpdateCultivatedCropDto } from '../dto/update-cultivated-crop.dto';
import { returnException } from '../../shared/exceptions';
import { CultivatedCropsRepositoryService } from '../repositories/cultivated-crops-repository.service';
import { TenantService } from '../../tenant/services/tenant.service';

@Injectable()
export class CultivatedCropsService {
  private readonly logger = new Logger(CultivatedCropsService.name, {
    timestamp: true,
  });

  constructor(
    private readonly cultivatedCropsRepository: CultivatedCropsRepositoryService,
    private readonly tenantService: TenantService,
  ) {}

  async create(createCultivatedCropDto: CreateCultivatedCropDto) {
    try {
      return await this.cultivatedCropsRepository.create(
        this.tenantService.user.id,
        createCultivatedCropDto,
      );
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
      return await this.cultivatedCropsRepository.findAll(
        this.tenantService.user.id,
        query,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.cultivatedCropsRepository.findOne(
        this.tenantService.user.id,
        id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateCultivatedCropDto: UpdateCultivatedCropDto) {
    try {
      return await this.cultivatedCropsRepository.update(
        this.tenantService.user.id,
        id,
        updateCultivatedCropDto,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.cultivatedCropsRepository.remove(
        this.tenantService.user.id,
        id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
