import { Test, TestingModule } from '@nestjs/testing';
import { CultivatedCropsRepositoryService } from './cultivated-crops-repository.service';
import { CultivatedCrop } from '../entities/cultivated-crop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CultivatedCropsRepositoryService', () => {
  let service: CultivatedCropsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivatedCropsRepositoryService,
        {
          provide: getRepositoryToken(CultivatedCrop),
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

    service = module.get<CultivatedCropsRepositoryService>(
      CultivatedCropsRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
