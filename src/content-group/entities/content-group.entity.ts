import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContentType } from '../dto/content-type.enum';
import { User } from '../../users/entities/user.entity';
import { Content } from '../../content/entities/content.entity';
import { ContentDto } from '../../content/dto/response.dto';
import { HaveOwner } from '../../common/have-owner.interface';

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

  @OneToMany(() => Content, (content) => content.groupId)
  contents?: ContentDto[];
}
