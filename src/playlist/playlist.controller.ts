import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Put()
  addTrackToPlaylist(@Body() addTrackToPlaylistDto: AddTrackToPlaylistDto) {
    return this.playlistService.addTrackToPlaylist(addTrackToPlaylistDto);
  }
}
