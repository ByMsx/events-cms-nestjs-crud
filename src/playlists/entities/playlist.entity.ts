import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';
import { User } from '../../users/entities/user.entity';
import { PlaylistContent } from '../../playlist-content/entities/playlist-content.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 32 })
  title: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Screen, (screen) => screen.playlist)
  screens: Screen[];

  @OneToMany(() => PlaylistContent, (content) => content.playlist)
  contents: PlaylistContent[];
}
