import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';
import { TenantGuard } from '../../tenant/guards/tenant.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  async getDashboard() {
    return await this.dashboardService.getDashboard();
  }
}
