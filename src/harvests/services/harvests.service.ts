import { Injectable, Logger } from '@nestjs/common';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { HarvestsRepositoryService } from '../repositories/harvests-repository.service';
import { returnException } from '../../shared/exceptions';

@Injectable()
export class HarvestsService {
  private readonly logger = new Logger(HarvestsService.name, {
    timestamp: true,
  });

  constructor(private readonly harvestsRepository: HarvestsRepositoryService) {}

  async create(createHarvestDto: CreateHarvestDto) {
    try {
      return await this.harvestsRepository.create(createHarvestDto);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: { page: number; take: number; name: string }) {
    try {
      return await this.harvestsRepository.findAll(query);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.harvestsRepository.findOne(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateHarvestDto: UpdateHarvestDto) {
    try {
      return await this.harvestsRepository.update(id, updateHarvestDto);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.harvestsRepository.remove(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
