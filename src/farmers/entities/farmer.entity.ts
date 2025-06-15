import { Farm } from '../../farms/entities/farm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'farmers' })
@Index(['documentNumber'], { unique: true })
export class Farmer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'document_number',
    type: 'varchar',
    length: 14,
  })
  documentNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone: string;

  @Column('boolean', { name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Farm, (farm) => farm.farmer, {
    cascade: true,
  })
  farms: Farm[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
