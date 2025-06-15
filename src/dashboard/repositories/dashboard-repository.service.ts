import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DashboardDto } from '../dto/dashboard.dto';
import { Farm } from '../../farms/entities/farm.entity';
import { returnException } from '../../shared/exceptions';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DashboardRepositoryService {
  private readonly logger = new Logger(DashboardRepositoryService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async getDashboard(userId: number) {
    try {
      const dashboard = new DashboardDto();

      dashboard.areaByType = { arableArea: 0, vegetationArea: 0 };

      const farms = await this.farmRepository.find({
        where: { accountId: userId },
      });

      dashboard.totalFarms = farms.length;
      dashboard.totalHectares = farms.reduce(
        (acc, farm) => acc + Number(farm.totalArea),
        0,
      );

      dashboard.byState = farms.reduce((byState, farm) => {
        const index = byState.findIndex((item) => item.state == farm.state);
        if (index === -1) {
          byState.push({ state: farm.state, total: 1 });
        } else {
          byState[index].total++;
        }
        return byState;
      }, []);

      dashboard.byCultivatedCrop = farms.reduce((byCultivatedCrop, farm) => {
        for (const cultivatedCrop of farm.cultivatedCrops) {
          const index = byCultivatedCrop.findIndex(
            (item) => item.id == cultivatedCrop.id,
          );

          if (index === -1) {
            byCultivatedCrop.push({
              cultivatedCrop: cultivatedCrop,
              total: 1,
            });
          } else {
            byCultivatedCrop[index].total++;
          }
        }

        return byCultivatedCrop;
      }, []);

      dashboard.areaByType = farms.reduce((areaByType, farm) => {
        areaByType.arableArea += farm.arableArea;
        areaByType.vegetationArea += farm.vegetationArea;

        return areaByType;
      }, null);

      return dashboard;
    } catch (error) {
      returnException(error, this.logger);
    }
  }
}
