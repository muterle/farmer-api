import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepositoryService } from './dashboard-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../../farms/entities/farm.entity';

describe('DashboardRepositoryService', () => {
  let service: DashboardRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardRepositoryService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DashboardRepositoryService>(
      DashboardRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
