import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { eager: true })
  order: Order;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @UpdateDateColumn()
  updated_at: Date;
}
