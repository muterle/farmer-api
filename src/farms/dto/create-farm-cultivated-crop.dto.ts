import { CultivatedCrop } from '../../cultivated-crops/entities/cultivated-crop.entity';
import { FarmCultivatedCropStage } from '../enums';
import { Farm } from '../entities/farm.entity';

export class FarmCultivatedCropDto {
  farm: Farm;
  cultivatedCrop: CultivatedCrop;
  stage: FarmCultivatedCropStage;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
