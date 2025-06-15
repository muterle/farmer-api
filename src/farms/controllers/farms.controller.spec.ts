import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from '../services/farms.service';
import { FarmsRepositoryService } from '../repositories/farms-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../entities/farm.entity';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';
import { TenantService } from '../../tenant/services/tenant.service';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';
import { User } from '../../users/entities/user.entity';

describe('FarmsController', () => {
  let controller: FarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [
        FarmsService,
        FarmsRepositoryService,
        TenantService,
        UsersRepositoryService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(null),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(FarmCultivatedCrop),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
