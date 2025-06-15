import { Injectable, Logger } from '@nestjs/common';
import { DashboardRepositoryService } from '../repositories/dashboard-repository.service';
import { returnException } from '../../shared/exceptions';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name, {
    timestamp: true,
  });

  constructor(
    private readonly dashboardRepositoryService: DashboardRepositoryService,
  ) {}

  async getDashboard() {
    try {
      return await this.dashboardRepositoryService.getDashboard();
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
