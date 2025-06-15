import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFarmerDto } from '../dto/create-farmer.dto';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';
import { returnException } from '../../shared/exceptions';
import { FarmersRepositoryService } from '../repositories/farmers-repository.service';
import { isValidCpfOrCnpj } from '../../shared/validations';
import { TenantService } from '../../tenant/services/tenant.service';

@Injectable()
export class FarmersService {
  private readonly logger = new Logger(FarmersService.name, {
    timestamp: true,
  });

  constructor(
    private readonly farmerRepository: FarmersRepositoryService,
    private readonly tenantService: TenantService,
  ) {}

  async create(createFarmerDto: CreateFarmerDto) {
    try {
      if (!isValidCpfOrCnpj(createFarmerDto.documentNumber)) {
        returnException(
          'Invalid CPF or CNPJ',
          this.logger,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return await this.farmerRepository.create(
        this.tenantService.user.id,
        createFarmerDto,
      );
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
      return await this.farmerRepository.findAll(
        this.tenantService.user.id,
        query,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.farmerRepository.findOne(
        this.tenantService.user.id,
        id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    try {
      if (!isValidCpfOrCnpj(updateFarmerDto.documentNumber)) {
        returnException(
          'Invalid CPF or CNPJ',
          this.logger,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return await this.farmerRepository.update(
        this.tenantService.user.id,
        id,
        updateFarmerDto,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.farmerRepository.remove(this.tenantService.user.id, id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
