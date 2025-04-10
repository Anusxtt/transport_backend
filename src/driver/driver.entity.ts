import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  idCardNumber: string;

  @Column({ nullable: true })
  licenseImage: string;

  @Column({ nullable: true })
  idCardImage: string;

  @Column({ nullable: true })
  vehicleRegistrationImage: string;

  @Column({
    type: 'enum',
    enum: ['upload_required', 'pending', 'approved', 'rejected'],
    default: 'upload_required',
  })
  status: string;

  @Column({ nullable: true })
  approvedBy: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
