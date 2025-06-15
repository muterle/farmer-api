import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CultivatedCropsService } from '../services/cultivated-crops.service';
import { CreateCultivatedCropDto } from '../dto/create-cultivated-crop.dto';
import { UpdateCultivatedCropDto } from '../dto/update-cultivated-crop.dto';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('cultivated-crops')
export class CultivatedCropsController {
  constructor(
    private readonly cultivatedCropsService: CultivatedCropsService,
  ) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Body() createCultivatedCropDto: CreateCultivatedCropDto) {
    return await this.cultivatedCropsService.create(createCultivatedCropDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async findAll(
    @Query()
    query: {
      page: number;
      take: number;
      name: string;
      harvestId: number;
    },
  ) {
    return await this.cultivatedCropsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cultivatedCropsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCultivatedCropDto: UpdateCultivatedCropDto,
  ) {
    return await this.cultivatedCropsService.update(
      +id,
      updateCultivatedCropDto,
    );
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cultivatedCropsService.remove(+id);
  }
}
