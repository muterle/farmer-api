import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from '../services/harvests.service';
import { HarvestsRepositoryService } from '../repositories/harvests-repository.service';
import { Harvest } from '../entities/harvest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HarvestsController', () => {
  let controller: HarvestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
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

    controller = module.get<HarvestsController>(HarvestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
