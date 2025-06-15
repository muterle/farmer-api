import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { JwtAuthGuard } from '../../auth/jwt-strategy/jwt.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDashboard() {
    return await this.dashboardService.getDashboard();
  }
}
