import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

export const usersTableName = 'user';

@Entity(usersTableName)
export class User {
  static tableName = usersTableName;

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
