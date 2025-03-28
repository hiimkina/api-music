import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async addTrackToPlaylist(addTrackToPlaylistDto: AddTrackToPlaylistDto) {
    const track = await this.trackRepository.findOneBy({ id: addTrackToPlaylistDto.trackId });
    const playlist = await this.playlistRepository.findOneBy({
      id: addTrackToPlaylistDto.playlistId,
    });
    if (track && playlist) {
      playlist.tracks.push(track);
      await this.playlistRepository.save(playlist);
    } else {
      throw new HttpException('Track or playlist not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createPlaylistDto: CreatePlaylistDto) {
    const newPlaylist = new Playlist();
    newPlaylist.name = createPlaylistDto.name;
    newPlaylist.ownerId = createPlaylistDto.ownerId;
    return await this.playlistRepository.save(newPlaylist);
  }

  findAll() {
    return this.playlistRepository.find();
  }

  findOne(id: number) {
    return this.playlistRepository.findOneBy({ id });
  }
}
