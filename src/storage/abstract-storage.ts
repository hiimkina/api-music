import { Track } from '../track/entities/track.entity';
import { ReadStream } from 'typeorm/browser/platform/BrowserPlatformTools';

export interface AbstractStorage {
  readTrackFile(track: Track): ReadStream;

  compileTrackFilePath(track: Track): string;
}
