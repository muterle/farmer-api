import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from '../services/dashboard.service';
import { DashboardRepositoryService } from '../repositories/dashboard-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { TenantService } from '../../tenant/services/tenant.service';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';
import { User } from '../../users/entities/user.entity';

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        DashboardService,
        DashboardRepositoryService,
        TenantService,
        UsersRepositoryService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
