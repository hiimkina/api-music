import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from './entities/track.entity';
import { AbstractStorage } from '../storage/abstract-storage';
import CONFIG from '../config/config.json';
import { S3Storage } from '../storage/s3-storage';
import { FileSystemStorage } from '../storage/file-system-storage';

@Injectable()
export class TrackService {
  private storage: AbstractStorage;

  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {
    if (CONFIG.storage.s3.enabled) {
      this.storage = new S3Storage();
    } else if (CONFIG.storage.filesystem.enabled) {
      this.storage = new FileSystemStorage();
    } else {
      throw new Error('Storage provider is not set in configuration');
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    let album = await this.albumRepository.findOneBy({
      name: createTrackDto.albumName,
    });
    if (!album) {
      const newAlbum = new Album();
      newAlbum.name = createTrackDto.name;
      album = await this.albumRepository.save(newAlbum);
    }

    const artists: Artist[] = [];
    for (let i = 0; i < createTrackDto.artistNames.length; i++) {
      const artistName = createTrackDto.artistNames[i];
      let artist = await this.artistRepository.findOneBy({ name: artistName });
      if (!artist) {
        const newArtist = new Artist();
        newArtist.name = artistName;
        artist = await this.artistRepository.save(newArtist);
      }
      artists.push(artist);
    }

    const newTrack = new Track();
    newTrack.name = createTrackDto.name;
    newTrack.album = album;
    newTrack.albumIndex = createTrackDto.albumIndex;
    newTrack.artists = artists;
    newTrack.duration = createTrackDto.duration;

    return this.trackRepository.save(newTrack);
  }

  findAll() {
    return this.trackRepository.find();
  }

  async stream(id: number) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(`Track with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.storage.readTrackFile(track);
  }
}
