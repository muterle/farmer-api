import { Test, TestingModule } from '@nestjs/testing';
import { CultivatedCropsService } from './cultivated-crops.service';
import { CultivatedCropsRepositoryService } from '../repositories/cultivated-crops-repository.service';
import { CultivatedCrop } from '../entities/cultivated-crop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CultivatedCropsService', () => {
  let service: CultivatedCropsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivatedCropsService,
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

    service = module.get<CultivatedCropsService>(CultivatedCropsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
