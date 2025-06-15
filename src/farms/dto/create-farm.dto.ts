import { FarmCultivatedCropDto } from './create-farm-cultivated-crop.dto';

export class CreateFarmDto {
  farmerId: number;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cultivatedCrops: FarmCultivatedCropDto[];
}
