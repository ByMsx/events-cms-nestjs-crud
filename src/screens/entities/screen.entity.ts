import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.screens)
  event: Event;

  @Column()
  eventId: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.screens)
  playlist: Playlist;

  @Column()
  playlistId: number;
}
