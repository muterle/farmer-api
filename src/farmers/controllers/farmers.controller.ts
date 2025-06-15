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
import { FarmersService } from '../services/farmers.service';
import { CreateFarmerDto } from '../dto/create-farmer.dto';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    return await this.farmersService.create(createFarmerDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async findAll(
    @Query()
    query: {
      page: number;
      take: number;
      name: string;
      documentNumber: string;
      isActive: boolean;
    },
  ) {
    return await this.farmersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.farmersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    return await this.farmersService.update(+id, updateFarmerDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.farmersService.remove(+id);
  }
}
