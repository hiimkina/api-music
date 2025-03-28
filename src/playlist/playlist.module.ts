import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/entities/track.entity';
import { Playlist } from './entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Track])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
