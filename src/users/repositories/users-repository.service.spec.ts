import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryService } from './users-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

describe('UsersRepositoryService', () => {
  let service: UsersRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepositoryService,
        {
          provide: getRepositoryToken(User),
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

    service = module.get<UsersRepositoryService>(UsersRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
