import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { FarmersRepositoryService } from '../repositories/farmers-repository.service';
import { Farmer } from '../entities/farmer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FarmersService', () => {
  let service: FarmersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmersService,
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

    service = module.get<FarmersService>(FarmersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
