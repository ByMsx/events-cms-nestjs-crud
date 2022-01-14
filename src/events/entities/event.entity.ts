import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Screen } from '../../screens/entities/screen.entity';
import { HaveOwner } from '../../have-owner.interface';

@Entity()
export class Event implements HaveOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 32 })
  title: string;

  @Column({ nullable: false })
  datetime: Date;

  @ManyToOne(() => User, (user) => user.events, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Screen, (screen) => screen.event)
  screens: Screen[];
}
