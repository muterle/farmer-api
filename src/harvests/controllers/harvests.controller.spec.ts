import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from '../services/harvests.service';
import { HarvestsRepositoryService } from '../repositories/harvests-repository.service';
import { Harvest } from '../entities/harvest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantService } from '../../tenant/services/tenant.service';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';
import { User } from '../../users/entities/user.entity';

describe('HarvestsController', () => {
  let controller: HarvestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [
        HarvestsService,
        HarvestsRepositoryService,
        TenantService,
        UsersRepositoryService,
        {
          provide: getRepositoryToken(Harvest),
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

    controller = module.get<HarvestsController>(HarvestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
