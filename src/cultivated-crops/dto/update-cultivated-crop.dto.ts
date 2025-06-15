import { PartialType } from '@nestjs/swagger';
import { CreateCultivatedCropDto } from './create-cultivated-crop.dto';

export class UpdateCultivatedCropDto extends PartialType(CreateCultivatedCropDto) {}
