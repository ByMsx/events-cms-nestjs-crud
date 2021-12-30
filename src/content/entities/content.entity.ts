import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ContentType } from '../dto/content-type.enum';
import { HaveOwner } from '../../have-owner.interface';

@Entity()
export class Content implements HaveOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ContentType, type: 'enum' })
  type: ContentType;

  @Column({ length: 256 })
  href: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Column()
  ownerId: number;
}
