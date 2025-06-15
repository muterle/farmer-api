import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from '../services/dashboard.service';
import { DashboardRepositoryService } from '../repositories/dashboard-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../../farms/entities/farm.entity';

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        DashboardService,
        DashboardRepositoryService,
        {
          provide: getRepositoryToken(Farm),
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
