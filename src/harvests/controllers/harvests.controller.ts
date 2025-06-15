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
import { HarvestsService } from '../services/harvests.service';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Body() createHarvestDto: CreateHarvestDto) {
    return await this.harvestsService.create(createHarvestDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async findAll(@Query() query: { page: number; take: number; name: string }) {
    return await this.harvestsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.harvestsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ) {
    return await this.harvestsService.update(+id, updateHarvestDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.harvestsService.remove(+id);
  }
}
