import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { returnException } from '../../shared/exceptions';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

@Injectable()
export class UsersRepositoryService {
  public logger = new Logger(UsersRepositoryService.name, { timestamp: true });

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save({
        ...createUserDto,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findAll(query: { page: number; take: number }) {
    try {
      let { page, take } = query;
      if (!page) page = 0;
      if (!take) take = 10;

      const [users, total] = await this.userRepository.findAndCount({
        where: {},
        skip: page * take,
        take,
      });

      return { total, users };
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async findByDocumentNumber(documentNumber: string) {
    try {
      return await this.userRepository.findOne({
        where: { documentNumber },
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(
        { id: id },
        {
          ...updateUserDto,
        },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    try {
      return await this.userRepository.update(
        { id: id },
        { password: updateUserPasswordDto.password },
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete({
        id,
      });
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
