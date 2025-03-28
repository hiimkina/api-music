import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ownerId: number;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
