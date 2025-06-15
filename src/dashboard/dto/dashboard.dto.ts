import { CultivatedCrop } from 'src/cultivated-crops/entities/cultivated-crop.entity';

export class DashboardDto {
  totalFarms: number;
  totalHectares: number;
  byState: {
    state: string;
    total: number;
  }[];
  byCultivatedCrop: {
    cultivatedCrop: CultivatedCrop;
    total: number;
  }[];
  areaByType: {
    arableArea: number;
    vegetationArea: number;
  };
}
