import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

@Entity()
export class PlaylistContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.contents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  playlist?: Playlist;

  @Column()
  playlistId: number;

  @ManyToOne(() => ContentGroup, (contentGroup) => contentGroup.id, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  contentGroup: ContentGroup;

  @Column()
  contentGroupId: number;

  @Column()
  duration: number;

  @Column()
  order: number;
}
