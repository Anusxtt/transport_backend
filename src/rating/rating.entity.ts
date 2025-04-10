import { Driver } from 'src/driver/driver.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column()
  order_id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  review: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
