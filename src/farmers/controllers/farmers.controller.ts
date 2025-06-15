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

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    return await this.farmersService.create(createFarmerDto);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.farmersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    return await this.farmersService.update(+id, updateFarmerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.farmersService.remove(+id);
  }
}
