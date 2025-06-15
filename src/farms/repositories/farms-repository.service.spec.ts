import { Test, TestingModule } from '@nestjs/testing';
import { FarmsRepositoryService } from './farms-repository.service';
import { Farm } from '../entities/farm.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';

describe('FarmsRepositoryService', () => {
  let service: FarmsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmsRepositoryService,
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
      ],
    }).compile();

    service = module.get<FarmsRepositoryService>(FarmsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
