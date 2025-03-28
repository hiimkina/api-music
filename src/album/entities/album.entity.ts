import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, { eager: true })
  artist: Artist;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ default: () => undefined })
  releaseDate?: Date;
}
