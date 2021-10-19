import Track from "../model/Track";
import AlbumService from "../services/AlbumService";
import Album from "../model/Album";
import Artist from "../model/Artist";

export default class TrackFactory {
    albumService: AlbumService;

    constructor() {
        this.albumService = new AlbumService();
    }

    createTrack(name: string, albumId: number, duration: number, artists: Array<Artist>):Promise<Track> {
        return new Promise((resolve) => {
            this.albumService.getAlbumFromId(albumId).then((album: Album|undefined) => {
                if (album) {
                    resolve(new Track(name, album, duration, artists));
                } else {
                    throw new Error('Album does not exist');
                }
            })
        })
    }
}
