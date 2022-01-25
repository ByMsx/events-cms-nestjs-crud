import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

@Entity()
@Unique(['groupId', 'extra'])
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  fileKey: string;

  @Column({ length: 64 })
  extra: string;

  @ManyToOne(() => ContentGroup, (group) => group.id, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT', // we must delete it manually because we have a file on AWS S3
  })
  group: ContentGroup;

  @Column()
  groupId: number;
}
