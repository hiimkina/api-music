import Album from "../model/Album";
import ArtistService from "../services/ArtistService";
import Artist from "../model/Artist";

export default class AlbumFactory {
    artistService: ArtistService;

    constructor() {
        this.artistService = new ArtistService();
    }

    createAlbum(name: string, artistId: number, releaseDate?: string):Promise<Album> {
        return new Promise ((resolve) => {
            this.artistService.getArtistFromId(artistId).then((artist: Artist|undefined) => {
                if (artist) {
                    if (releaseDate === undefined) {
                        resolve(new Album(name, artist));
                    } else {
                        resolve(new Album(name, artist, releaseDate, undefined, undefined))
                    }
                } else {
                    throw new Error('Artist does not exist');
                }
            })
        });
    }
}
