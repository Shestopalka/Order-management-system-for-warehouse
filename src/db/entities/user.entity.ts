import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
