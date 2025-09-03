import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logs')
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column({ type: 'json', nullable: true })
  metaData: Record<string, any>;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  ip: string;

  @CreateDateColumn()
  create_at: Date;
}
