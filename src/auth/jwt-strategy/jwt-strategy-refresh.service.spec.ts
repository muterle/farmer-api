import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategyRefreshService } from './jwt-strategy-refresh.service';

describe('JwtStrategyRefreshService', () => {
  let service: JwtStrategyRefreshService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategyRefreshService],
    }).compile();

    service = module.get<JwtStrategyRefreshService>(JwtStrategyRefreshService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
