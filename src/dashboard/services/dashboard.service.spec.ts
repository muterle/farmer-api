import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { DashboardRepositoryService } from '../repositories/dashboard-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../../farms/entities/farm.entity';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        DashboardRepositoryService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
