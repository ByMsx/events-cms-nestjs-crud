import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ContentType } from '../dto/content-type.enum';
import { HaveOwner } from '../../common/have-owner.interface';

@Entity()
export class Content implements HaveOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ContentType, type: 'enum' })
  type: ContentType;

  @Column({ length: 256 })
  href: string;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // TODO: do not forget in part-2 make it restrict, because we must remove file from AWS
  })
  owner: User;

  @Column()
  ownerId: number;
}
