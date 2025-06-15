import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { returnException } from '../../shared/exceptions';

import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UsersRepositoryService } from '../repositories/users-repository.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name, { timestamp: true });

  constructor(private readonly userRepository: UsersRepositoryService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 8),
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: { page: number; take: number }) {
    try {
      return await this.userRepository.findAll(query);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findByDocumentNumber(documentNumber: string) {
    try {
      return await this.userRepository.findByDocumentNumber(documentNumber);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    try {
      return await this.userRepository.update(id, {
        password: bcrypt.hashSync(updateUserPasswordDto.password, 8),
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.remove(id);
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
