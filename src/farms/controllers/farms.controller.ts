import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Body() createFarmDto: CreateFarmDto) {
    return await this.farmsService.create(createFarmDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async findAll(
    @Query()
    query: {
      page: number;
      take: number;
      name: string;
      farmerId: number;
    },
  ) {
    return await this.farmsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.farmsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return await this.farmsService.update(+id, updateFarmDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.farmsService.remove(+id);
  }
}
