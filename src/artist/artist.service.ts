import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const existingArtist = await this.artistsRepository.findOneBy({
      name: createArtistDto.name,
    });
    if (existingArtist) {
      throw new HttpException(`Artist ${createArtistDto.name} already exists`, HttpStatus.CONFLICT);
    } else {
      const newArtist = new Artist();
      newArtist.name = createArtistDto.name;
      return await this.artistsRepository.save(newArtist);
    }
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: number) {
    return await this.artistsRepository.findOneBy({ id });
  }
}
