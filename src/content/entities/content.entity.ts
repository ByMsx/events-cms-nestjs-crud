import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  fileKey: string;

  @Column({ length: 512 })
  href: string;

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
