import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();
    let artist = await this.artistRepository.findOneBy({
      name: createAlbumDto.artistName,
    });
    if (!artist) {
      const newArtist = new Artist();
      newArtist.name = createAlbumDto.artistName;
      artist = await this.artistRepository.save(newArtist);
    }
    newAlbum.name = createAlbumDto.name;
    newAlbum.releaseDate = createAlbumDto.releaseDate ?? undefined;
    newAlbum.artist = artist;
    return await this.albumRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({ id });
  }
}
