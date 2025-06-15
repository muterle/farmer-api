import { Test, TestingModule } from '@nestjs/testing';
import { FarmsRepositoryService } from './farms-repository.service';
import { Farm } from '../entities/farm.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';
import { TenantService } from '../../tenant/services/tenant.service';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';
import { User } from '../../users/entities/user.entity';

describe('FarmsRepositoryService', () => {
  let service: FarmsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<FarmsRepositoryService>(FarmsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
