import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Album, (album) => album.id, { eager: true })
  album: Album;

  @Column()
  albumIndex: number;

  @Column()
  duration: number;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];
}
