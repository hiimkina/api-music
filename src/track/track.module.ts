import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
