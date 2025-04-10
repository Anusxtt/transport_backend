import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transport_types')
export class TransportType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['logistics', 'passenger'] })
  category: 'logistics' | 'passenger';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  base_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_km: number;

  @Column({ type: 'int', nullable: true })
  max_weight: number;

  @Column({ type: 'int', nullable: true })
  max_passengers: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
