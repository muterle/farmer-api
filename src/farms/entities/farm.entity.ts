import { Farmer } from '../../farmers/entities/farmer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FarmCultivatedCrop } from './farm-cultivated-crop.entity';

@Entity({ name: 'farms' })
export class Farm {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Farmer, (farmer) => farmer.farms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'farmer_id' })
  farmer: Farmer;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ name: 'total_area', default: 0 })
  totalArea: number;

  @Column({ name: 'arable_area', default: 0 })
  arableArea: number;

  @Column({ name: 'vegetation_area', default: 0 })
  vegetationArea: number;

  @OneToMany(
    () => FarmCultivatedCrop,
    (cultivatedCrop) => cultivatedCrop.farm,
    {
      cascade: true,
    },
  )
  cultivatedCrops: FarmCultivatedCrop[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
