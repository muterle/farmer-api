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
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async findAll(@Query() query: { page: number; take: number }) {
    return await this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Put('/password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return await this.usersService.updatePassword(+id, body);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
