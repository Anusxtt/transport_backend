import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TransportService } from '../transport-service/transport-service.entity';
import { User } from 'src/users/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TransportService, { eager: true })
  service: TransportService;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  sender_name: string;

  @Column()
  sender_phone: string;

  @Column()
  receiver_name: string;

  @Column()
  receiver_phone: string;

  @Column('text')
  pickup_location: string;

  @Column('text')
  dropoff_location: string;

  @Column({ default: 'รอดำเนินการ' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
