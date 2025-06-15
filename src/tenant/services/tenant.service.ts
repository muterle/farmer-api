import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersRepositoryService } from '../../users/repositories/users-repository.service';

@Injectable()
export class TenantService {
  private userLogin: User | null = null;

  constructor(private readonly userRepositoryService: UsersRepositoryService) {}

  get user(): User {
    return this.userLogin;
  }
  set user(user: User) {
    this.userLogin = user;
  }

  async setTenantBy(userId: number) {
    this.user = await this.userRepositoryService.findOne(userId);
  }
}
