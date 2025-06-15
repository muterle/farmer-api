import { Injectable, Logger } from '@nestjs/common';
import { DashboardRepositoryService } from '../repositories/dashboard-repository.service';
import { returnException } from '../../shared/exceptions';
import { TenantService } from '../../tenant/services/tenant.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name, {
    timestamp: true,
  });

  constructor(
    private readonly dashboardRepositoryService: DashboardRepositoryService,
    private readonly tenantService: TenantService,
  ) {}

  async getDashboard() {
    try {
      return await this.dashboardRepositoryService.getDashboard(
        this.tenantService.user.id,
      );
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
