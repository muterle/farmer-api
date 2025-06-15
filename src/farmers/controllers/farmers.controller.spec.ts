import { Test, TestingModule } from '@nestjs/testing';
import { FarmersController } from './farmers.controller';
import { FarmersService } from '../services/farmers.service';
import { FarmersRepositoryService } from '../repositories/farmers-repository.service';
import { Farmer } from '../entities/farmer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantService } from '../../tenant/services/tenant.service';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';
import { User } from '../../users/entities/user.entity';

describe('FarmersController', () => {
  let controller: FarmersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmersController],
      providers: [
        FarmersService,
        FarmersRepositoryService,
        TenantService,
        UsersRepositoryService,
        {
          provide: getRepositoryToken(Farmer),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(null),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FarmersController>(FarmersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
