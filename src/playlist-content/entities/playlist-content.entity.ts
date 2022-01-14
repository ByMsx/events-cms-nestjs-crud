import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';

@Entity()
export class PlaylistContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.contents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  playlist: Playlist;

  @Column()
  playlistId: number;

  //REVIEW: content?
  @ManyToOne(() => Content, (content) => content.id, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  content: Content;

  @Column()
  contentId: number;

  @Column()
  duration: number;

  @Column()
  order: number;
}
