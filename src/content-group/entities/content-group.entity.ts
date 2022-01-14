import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentType } from '../dto/content-type.enum';
import { User } from '../../users/entities/user.entity';
import { HaveOwner } from '../../have-owner.interface';

@Entity()
export class ContentGroup implements HaveOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ContentType, type: 'enum' })
  type: ContentType;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  owner: User;

  @Column()
  ownerId: number;
}
