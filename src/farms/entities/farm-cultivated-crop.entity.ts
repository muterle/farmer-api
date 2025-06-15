import { CultivatedCrop } from '../../cultivated-crops/entities/cultivated-crop.entity';
import { Farm } from '../../farms/entities/farm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FarmCultivatedCropStage } from '../enums';

@Entity({ name: 'farm_cultivated_crops' })
export class FarmCultivatedCrop {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Farm, (farm) => farm.cultivatedCrops, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @ManyToOne(() => CultivatedCrop)
  @JoinColumn({ name: 'cultivated_crop_id', referencedColumnName: 'id' })
  cultivatedCrop: CultivatedCrop;

  @Column({
    type: 'enum',
    enum: FarmCultivatedCropStage,
    default: FarmCultivatedCropStage.AGRICULTURAL_PLANNING,
  })
  stage: FarmCultivatedCropStage;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
