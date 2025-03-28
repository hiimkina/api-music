import { AbstractStorage } from './abstract-storage';
import { Track } from '../track/entities/track.entity';
import * as fs from 'node:fs';

export class S3Storage implements AbstractStorage {
  public compileTrackFilePath(track: Track) {
    throw new Error('S3 storage is not implemented yet');
    return 'toto';
  }

  public readTrackFile(track: Track) {
    throw new Error('S3 storage is not implemented yet');
    return fs.createReadStream(this.compileTrackFilePath(track));
  }
}
