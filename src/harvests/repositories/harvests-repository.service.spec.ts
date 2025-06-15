import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsRepositoryService } from './harvests-repository.service';
import { Harvest } from '../entities/harvest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HarvestsRepositoryService', () => {
  let service: HarvestsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestsRepositoryService,
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
      ],
    }).compile();

    service = module.get<HarvestsRepositoryService>(HarvestsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
