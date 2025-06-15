import { Test, TestingModule } from '@nestjs/testing';
import { FarmsService } from './farms.service';
import { FarmsRepositoryService } from '../repositories/farms-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../entities/farm.entity';
import { FarmCultivatedCrop } from '../entities/farm-cultivated-crop.entity';

describe('FarmsService', () => {
  let service: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmsService,
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

    service = module.get<FarmsService>(FarmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
