import { Injectable, Logger } from '@nestjs/common';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { HarvestsRepositoryService } from '../repositories/harvests-repository.service';
import { returnException } from '../../shared/exceptions';
import { TenantService } from '../../tenant/services/tenant.service';

@Injectable()
export class HarvestsService {
  private readonly logger = new Logger(HarvestsService.name, {
    timestamp: true,
  });

  constructor(
    private readonly harvestsRepository: HarvestsRepositoryService,
    private readonly tenantService: TenantService,
  ) {}

  async create(createHarvestDto: CreateHarvestDto) {
    try {
      return await this.harvestsRepository.create(
        this.tenantService.user.id,
        createHarvestDto,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: { page: number; take: number; name: string }) {
    try {
      return await this.harvestsRepository.findAll(
        this.tenantService.user.id,
        query,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.harvestsRepository.findOne(
        this.tenantService.user.id,
        id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateHarvestDto: UpdateHarvestDto) {
    try {
      return await this.harvestsRepository.update(
        this.tenantService.user.id,
        id,
        updateHarvestDto,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.harvestsRepository.remove(
        this.tenantService.user.id,
        id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
