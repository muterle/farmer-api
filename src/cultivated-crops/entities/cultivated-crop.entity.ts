import { Harvest } from '../../harvests/entities/harvest.entity';
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

@Entity({ name: 'cultivated_crops' })
export class CultivatedCrop {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Harvest)
  @JoinColumn({ name: 'harvest_id', referencedColumnName: 'id' })
  harvest: Harvest;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
