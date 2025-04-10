import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('transport_services')
export class TransportService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'สินค้า' | 'ผู้โดยสาร';

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  created_at: Date;
}
