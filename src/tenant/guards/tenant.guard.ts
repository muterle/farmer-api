import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.user;

    await this.tenantService.setTenantBy(userId);

    return true;
  }
}
