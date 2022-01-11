import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';

@Entity()
export class PlaylistContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.contents)
  playlist: Playlist;

  @Column()
  playlistId: number;

  @ManyToOne(() => Content, (content) => content.id)
  content: Content;

  @Column()
  contentId: number;

  @Column()
  duration: number;

  @Column()
  order: number;
}
