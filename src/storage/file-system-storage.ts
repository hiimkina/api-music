import { AbstractStorage } from './abstract-storage';
import CONFIG from '../config/config.json';
import { Track } from '../track/entities/track.entity';
import * as fs from 'node:fs';
import { ReadStream } from 'typeorm/browser/platform/BrowserPlatformTools';

export class FileSystemStorage implements AbstractStorage {
  public compileTrackFilePath(track: Track): string {
    return CONFIG.storage.filesystem.path + '/' + track.album.id + '/' + track.name;
  }

  public readTrackFile(track: Track): ReadStream {
    return fs.createReadStream(this.compileTrackFilePath(track));
  }
}
