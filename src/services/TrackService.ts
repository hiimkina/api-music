import TrackFactory from "../factories/TrackFactory";
import TrackRepository from "../repository/TrackRepository";
import Track from "../model/Track";
import Artist from "../model/Artist";
import ArtistService from "./ArtistService";
import {FileArray, UploadedFile} from "express-fileupload";
import AlbumService from "./AlbumService";
import Album from "../model/Album";

const CONFIG = require('../config/config.json');

export default class TrackService {
    artistService: ArtistService;
    albumService: AlbumService
    trackFactory: TrackFactory;
    trackRepository: TrackRepository;

    constructor() {
        this.artistService = new ArtistService();
        this.albumService = new AlbumService();
        this.trackFactory = new TrackFactory();
        this.trackRepository = new TrackRepository();
    }

    async createTrack(name: string, albumId: number, duration: number, artists: string, files: FileArray|undefined):Promise<Track> {
        if(!await this.checkIfTrackExists(name, albumId) && files !== undefined) {
            let promiseArray:Array<Promise<Artist>> = artists.split(',').map((artistName: string) => {
                return new Promise(async (resolve) => {
                    let artist:Artist|undefined = await this.artistService.getArtistFromName(artistName);
                    if (artist === undefined) {
                        artist = await this.artistService.createArtist(artistName);
                    }
                    resolve(artist);
                })
            });
            let artistsArray: Array<Artist> = await Promise.all(promiseArray);
            let track: Track = await this.trackFactory.createTrack(name, albumId, duration, artistsArray);
            let trackId: number = await this.trackRepository.create(track);
            artistsArray.forEach((artist: Artist) => {
                if (artist.id) {
                    this.trackRepository.addArtistToTrack(trackId, artist.id);
                } else {
                    throw new Error("Error adding an artist to a track due to artist having no id");
                }
            })
            let musicFile = files.music as UploadedFile;
            await musicFile.mv(`./uploads/${track.album.name}/${track.name}.mp3`);
            return {...track, id: trackId};
        } else {
            throw new Error('Track already exists !');
        }
    }

    async getRecentTracks():Promise<Array<Track>> {
        let tracksArray:Array<Track> = await this.trackRepository.getRecentTracks();
        let promiseArray:Array<Promise<Track>> = tracksArray.map((track: Track) => {
            return new Promise(async (resolve) => {
                if (track.id !== undefined) {
                    track.artists = await this.artistService.getArtistFromTrackId(track.id);
                    let album = await this.albumService.getAlbumFromId(track.album_id ? track.album_id : 0);
                    if (album !== undefined) {
                        track.album = album;
                    }
                    resolve(track);
                } else {
                    throw new Error('Track id is undefined');
                }
            });
        });
        return await Promise.all(promiseArray);
    }

    async streamTrack(name: string, albumId: number):Promise<string> {
        if(await this.checkIfTrackExists(name, albumId)) {
            let album:Album|undefined = await this.albumService.getAlbumFromId(albumId);
            if (album !== undefined) {
                return `${CONFIG.uploadDirectory}/${album.name}/${name}.mp3`;
            } else {
                throw new Error('Album does not exists !');
            }
        } else {
            throw new Error('Track does not exist !');
        }
    }

    async checkIfTrackExists(name: string, albumId: number):Promise<boolean> {
        return await this.trackRepository.getFromNameAndAlbumId(name, albumId) !== undefined;
    }
}
