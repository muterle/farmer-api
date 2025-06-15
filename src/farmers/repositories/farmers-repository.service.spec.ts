import { Test, TestingModule } from '@nestjs/testing';
import { FarmersRepositoryService } from './farmers-repository.service';
import { Farmer } from '../entities/farmer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FarmersRepositoryService', () => {
  let service: FarmersRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmersRepositoryService,
        {
          provide: getRepositoryToken(Farmer),
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

    service = module.get<FarmersRepositoryService>(FarmersRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
