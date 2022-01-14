import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, nullable: false })
  fullName: string;

  @Column({ length: 32, nullable: false, unique: true })
  email: string;

  @Column({ length: 32 })
  passwordHash: string;

  @OneToMany(() => Event, (event) => event.owner)
  events: Event[];
}
