import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsService } from './harvests.service';
import { HarvestsRepositoryService } from '../repositories/harvests-repository.service';
import { Harvest } from '../entities/harvest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HarvestsService', () => {
  let service: HarvestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestsService,
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

    service = module.get<HarvestsService>(HarvestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
